namespace GameOfBrushes.Migrations
{
    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;
    using System.Web;

    using GameOfBrushes.Models;

    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using Microsoft.AspNet.Identity.Owin;

    internal sealed class Configuration : DbMigrationsConfiguration<GameOfBrushes.Models.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
            ContextKey = "GameOfBrushes.Models.ApplicationDbContext";
        }

        protected override void Seed(GameOfBrushes.Models.ApplicationDbContext context)
        {
            var roleStore = new RoleStore<IdentityRole>(context);
            var roleManager = new RoleManager<IdentityRole>(roleStore);
            var userStore = new UserStore<ApplicationUser>(context);
            var userManager = new UserManager<ApplicationUser>(userStore);

            if (!context.Roles.Any(r => r.Name == "Bot"))
            {
                var role = new IdentityRole { Name = "Bot" };
                roleManager.Create(role);
            }

            const string name1 = "Bot1";
            const string name2 = "Bot2";
            const string name3 = "Bot3";
            const string name4 = "Bot4";

            const string password = "Bot123!";

            var user1 = userManager.FindByName(name1);
            var user2 = userManager.FindByName(name2);
            var user3 = userManager.FindByName(name3);
            var user4 = userManager.FindByName(name4);

            if (user1 == null)
            {
                user1 = new ApplicationUser { UserName = name1, Email = name1 + "@bots.com", UserInfo = new UserInfo() };
                user1.UserInfoId = user1.Id;
                userManager.Create(user1, password);
            }
            if (user2 == null)
            {
                user2 = new ApplicationUser { UserName = name2, Email = name2 + "@bots.com", UserInfo = new UserInfo() };
                user2.UserInfoId = user2.Id;
                userManager.Create(user2, password);
            }
            if (user3 == null)
            {
                user3 = new ApplicationUser { UserName = name3, Email = name3 + "@bots.com", UserInfo = new UserInfo() };
                user3.UserInfoId = user3.Id;
                userManager.Create(user3, password);
            }
            if (user4 == null)
            {
                user4 = new ApplicationUser { UserName = name4, Email = name4 + "@bots.com", UserInfo = new UserInfo() };
                user4.UserInfoId = user4.Id;
                userManager.Create(user4, password);
            }

            var rolesForUser1 = userManager.GetRoles(user1.Id);
            var rolesForUser2 = userManager.GetRoles(user2.Id);
            var rolesForUser3 = userManager.GetRoles(user3.Id);
            var rolesForUser4 = userManager.GetRoles(user4.Id);

            if (!rolesForUser1.Contains("Bot"))
            {
                userManager.AddToRole(user1.Id, "Bot");
            }
            if (!rolesForUser2.Contains("Bot"))
            {
                userManager.AddToRole(user2.Id, "Bot");
            }
            if (!rolesForUser3.Contains("Bot"))
            {
                userManager.AddToRole(user3.Id, "Bot");
            }
            if (!rolesForUser4.Contains("Bot"))
            {
                userManager.AddToRole(user4.Id, "Bot");
            }

            if (!context.Games.Any(x => x.Name == "Bot Game"))
            {
                context.Games.AddOrUpdate(new Game
                {
                    Contestants = new HashSet<ApplicationUser>
                                                                {
                                                                    user1, user2, user3, user4
                                                                },
                    Name = "Bot Game",
                    RoomCreator = user1
                });
            }
        }
    }
}
