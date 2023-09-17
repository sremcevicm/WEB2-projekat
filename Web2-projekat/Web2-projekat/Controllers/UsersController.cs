﻿using DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using Web2_projekat.Interfaces;
using Web2_projekat.Services;

namespace Web2_projekat.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUser _userService;

        public UsersController(IUser userService)
        {
            _userService = userService;
        }

        [HttpPost]
        public async Task<ActionResult> User([FromForm] RegisterUser user)
        {
            return Ok(await _userService.CreateUser(user));
        }

        [HttpPost]
        [Route("login")]
        public async Task<ActionResult> Login(LoginUser user)
        {
            return Ok(await _userService.Login(user.Username, user.Password));
        }

        [HttpPost]
        [Route("facebooklogin")]
        public async Task<ActionResult> FacebookLogin(FacebookLoginUser user)
        {
            return Ok(await _userService.FacebookLogin(user));
        }

        [HttpPut]
        [Route("users/{username}/update")]
        public async Task<ActionResult> Update([FromForm] UpdateUser user)
        {
            return Ok(await _userService.UpdateUser(user));
        }

        [HttpPatch]
        [Route("users/{username}/verify")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> Verify(VerifyUserModel user)
        {
            return Ok(await _userService.Verify(user));
        }

        [HttpGet]
        [Route("users/sellers")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> GetSellers()
        {
            return Ok(await _userService.GetSellers());
        }
    }
}
