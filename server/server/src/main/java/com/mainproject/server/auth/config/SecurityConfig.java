package com.mainproject.server.auth.config;

import com.mainproject.server.auth.filter.JwtVerificationFilter;
import com.mainproject.server.auth.handler.MemberAccessDeniedHandler;
import com.mainproject.server.auth.handler.MemberAuthenticationEntryPoint;
import com.mainproject.server.auth.handler.OAuth2SuccessHandler;
import com.mainproject.server.auth.utils.CustomAuthorityUtil;
import com.mainproject.server.member.jwt.JwtTokenizer;
import com.mainproject.server.member.repository.MemberRepository;
import com.mainproject.server.member.service.CustomOAuth2UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.client.web.OAuth2LoginAuthenticationFilter;

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    private final CustomOAuth2UserService customOauth2UserService;
    private final OAuth2SuccessHandler oAuth2SuccessHandler;
    private final JwtTokenizer jwtTokenizer;
    private final MemberRepository memberRepository;
    private final CustomAuthorityUtil customAuthorityUtil;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .headers().frameOptions().sameOrigin()
                .and()
                .cors()
                .and()
                .csrf().disable()
                .formLogin().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .exceptionHandling()
                .authenticationEntryPoint(new MemberAuthenticationEntryPoint())
                .accessDeniedHandler(new MemberAccessDeniedHandler())
                .and()
                .apply(new CustomFilterConfigurer())
                .and()
                .authorizeHttpRequests(authorize -> authorize
                        .antMatchers(HttpMethod.GET,"/api/members/ranking").permitAll()
                        .antMatchers(HttpMethod.PATCH,"/**").hasRole("USER")
//                        .antMatchers(HttpMethod.GET,"/api/members/**").hasRole("USER")
                        .antMatchers("/**").permitAll()
                        .anyRequest().permitAll())
                .logout().logoutSuccessUrl("/")
                .and()
                .oauth2Login()
                .authorizationEndpoint()
                .baseUri("/oauth2/authorization")
                .and()
                .userInfoEndpoint()
                .userService(customOauth2UserService)
                .and()
                .successHandler(oAuth2SuccessHandler);
    }

    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {
        @Override
        public void configure(HttpSecurity builder) throws Exception {
            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, memberRepository, customAuthorityUtil);

            builder.addFilterAfter(jwtVerificationFilter, OAuth2LoginAuthenticationFilter.class);
        }
    }
}
