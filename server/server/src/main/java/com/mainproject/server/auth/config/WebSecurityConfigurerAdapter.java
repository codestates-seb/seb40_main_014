package com.mainproject.server.auth.config;

import com.mainproject.server.auth.handler.OAuth2SuccessHandler;
import com.mainproject.server.member.service.CustomOAuth2UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

@RequiredArgsConstructor
@EnableWebSecurity
public class WebSecurityConfigurerAdapter extends org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter {
    private final CustomOAuth2UserService customOauth2UserService;
    private final OAuth2SuccessHandler oAuth2SuccessHandler;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .cors()
                .and()
                .csrf().disable().headers().frameOptions().disable()
                .and()
                .authorizeRequests()
                .antMatchers("/test/**").hasRole("USER")
                .antMatchers(HttpMethod.PATCH,"/api/members/**").hasRole("USER")
                .antMatchers("/**").permitAll()
                .anyRequest()
                .authenticated()
                .and()
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
}
