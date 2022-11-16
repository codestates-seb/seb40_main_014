package com.mainproject.server.ChatRoom.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mainproject.server.ChatRoom.entity.ChatMessage;
import com.mainproject.server.ChatRoom.entity.ChatRoom;
import com.mainproject.server.ChatRoom.service.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.apache.tomcat.util.modeler.Util;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
@RequiredArgsConstructor
@Slf4j
public class WebSocketHandler extends TextWebSocketHandler {

    private final Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();
    /**
     * key : session ID
     * value : session
     */
    private final ObjectMapper objectMapper;
    private final ChatService chatService;

//    @Override
//    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
//
//        var sessionId = session.getId();
//        sessions.put(sessionId, session); // 1. 세션 저장
//
//        ChatMessage chatMessage = ChatMessage.builder().memberId(sessionId).channelId("all").build();
//        chatMessage.newConnect();
//
//        sessions.values().forEach(s -> {
//            try {
//                if (!s.getId().equals(sessionId)) {
//                    s.sendMessage(new TextMessage(StringUtils.getString(chatMessage)));
//                }
//            }
//            catch (Exception e) {
//
//            }
//        });
//    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {

        String payload = message.getPayload();
        log.info("{}", payload);
        ChatMessage chatMessage = objectMapper.readValue(payload, ChatMessage.class);

        ChatRoom chatRoom = chatService.findChatRoom(chatMessage.getRoomId());
        chatRoom.handlerActions(session, chatMessage, chatService);
    }

//    @Override
//    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
//        var sessionId = session.getId();
//        sessions.remove(sessionId);
//
//        final ChatMessage message = new ChatMessage();
//        message.closeConnect();
//        message.setMemberId(sessionId);
//
//        sessions.values().forEach(s -> {
//            try {
//                s.sendMessage(new ChatMessage(Utils.getString(message)));
//            } catch (Exception e) {
//
//            }
//        });
//    }
}
