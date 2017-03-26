namespace GameOfBrushes.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedIsActiveBoolean : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Games", "IsActive", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Games", "IsActive");
        }
    }
}
