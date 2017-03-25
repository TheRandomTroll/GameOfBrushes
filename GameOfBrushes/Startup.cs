using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(GameOfBrushes.Startup))]
namespace GameOfBrushes
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
