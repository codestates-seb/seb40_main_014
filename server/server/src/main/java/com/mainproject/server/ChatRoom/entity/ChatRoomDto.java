package com.mainproject.server.ChatRoom.entity;

import lombok.*;
import java.util.List;

@Data
@Builder
@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class ChatRoomDto {

        private List<String> userlist;

}
