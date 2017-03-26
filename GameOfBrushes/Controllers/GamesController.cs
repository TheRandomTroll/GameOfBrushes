using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using GameOfBrushes.Models;

namespace GameOfBrushes.Controllers
{
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.Owin;

    [Authorize]
    public class GamesController : Controller
    {
        private ApplicationSignInManager _signInManager;
        private ApplicationUserManager _userManager;
        private ApplicationDbContext db = new ApplicationDbContext();

        public ApplicationSignInManager SignInManager
        {
            get
            {
                return _signInManager ?? HttpContext.GetOwinContext().Get<ApplicationSignInManager>();
            }
            private set
            {
                _signInManager = value;
            }
        }

        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }

        // GET: Games
        public ActionResult Index()
        {
            var games = db.Games.Include(g => g.RoomCreator);
            return View(games.ToList());
        }

        // GET: Games/Join/5
        public ActionResult Join(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Game game = db.Games.Find(id);
            if (game == null)
            {
                return HttpNotFound();
            }
            var user = this.db.Users.Find(User.Identity.GetUserId());
            game.Contestants.Add(user);
            user.UserInfo.JoinedGame = game;
            user.UserInfo.JoinedGame_Id = game.Id;
            db.Users.Attach(user);
            var entry = db.Entry(user);
            entry.Property(x => x.UserInfo.JoinedGame_Id).IsModified = true;
            entry.Property(x => x.UserInfo.JoinedGame).IsModified = true;
            db.SaveChanges();
            return View(game);
        }

        // GET: Games/Create
        public ActionResult Create()
        {
            ViewBag.RoomCreatorId = new SelectList(db.Users, "Id", "UserInfoId");
            return View();
        }

        // POST: Games/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "Name")] Game game)
        {
            if (ModelState.IsValid)
            {
                var newGame = new Game
                                  {
                                      Name = game.Name,
                                      RoomCreator = this.db.Users.Find(this.User.Identity.GetUserId())
                                  };
                db.Games.Add(newGame);
                db.SaveChanges();
                return RedirectToAction("Join", new {newGame.Id});
            }

            ViewBag.RoomCreatorId = new SelectList(db.Users, "Id", "UserInfoId", game.RoomCreatorId);
            return View(game);
        }
        // GET: Games/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Game game = db.Games.Find(id);
            if (game == null)
            {
                return HttpNotFound();
            }
            return View(game);
        }

        // POST: Games/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Game game = db.Games.Find(id);
            foreach (var user in game.Contestants)
            {
                user.UserInfo.JoinedGame_Id = null;
                user.UserInfo.JoinedGame = null;
            }
            db.Games.Remove(game);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
