package com.mainproject.server.tx;

import com.mainproject.server.auth.utils.MemberIdAuthenticationToken;
import lombok.RequiredArgsConstructor;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;
import java.lang.reflect.Method;
import java.lang.reflect.Parameter;
import org.aspectj.lang.reflect.MethodSignature;

@Aspect
@Component
@RequiredArgsConstructor
public class TxAspect {

    private final PlatformTransactionManager transactionManager;

    @Around("@annotation(com.mainproject.server.tx.NeedMemberId)") //NeedMemberId를 붙인 메소드에
    public Object applyTx(ProceedingJoinPoint joinPoint) throws Throwable {

        TransactionStatus transaction = transactionManager.getTransaction(new DefaultTransactionDefinition());

        try {
            Object[] parameterValues = joinPoint.getArgs(); //우선 현재 Controller로 넘어 온 파라미터 값들을 가져 옴
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication(); //SecurityContext에 저장된 Authentication 가져 옴

            MemberIdAuthenticationToken idToken = (MemberIdAuthenticationToken) authentication;
            Long memberId = idToken.getMemberId(); //SecurityContext에 저장된 서버가 인식하는 실제 MemberId

            //조인 포인트 (호출 되는 메소드를 말한다) 가 호출되는 시점에 넘겨 받은 인자값들
            MethodSignature signature = (MethodSignature) joinPoint.getSignature(); //메소드의 선언 부분에 대한 정보
            Method method = signature.getMethod(); //메소드 자체의 대한 정보를 갖는 클래스
            Parameter[] parameters = method.getParameters(); //메소드가 갖는 파라미터들의 정보

            for (int i = 0; i < method.getParameters().length; i++) {
                if (parameters[i].getName().equals("authMemberId")) { //i번째 파라미터의 이름이 "authMemberId"일 경우
                    parameterValues[i] = memberId; //해당 파라미터에 위에서 Authentication을 이용하여 얻은 "memberId"를 넣음
                    break;
                }
            }

            Object object = joinPoint.proceed(parameterValues); //새롭게 설정된 파라미터 값들을 해당 메소드에 전달

            transactionManager.commit(transaction);
            return object;
        } catch (RuntimeException runtimeException) {
            transactionManager.rollback(transaction);
            throw runtimeException;
        }
    }
}
