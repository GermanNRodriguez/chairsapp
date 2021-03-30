using System.Data.SqlClient;

namespace Access
{
    class Access
    {
        public static SqlConnection Connect()
        {
            string conectServer = @"workstation id=Asientos.mssql.somee.com;packet size=4096;user id=GernirozPruebas_SQLLogin_1;pwd=7owvnvrrpu;data source=Asientos.mssql.somee.com;persist security info=False;initial catalog=Asientos";
            string Conexion = @"Data Source=GERNIROZ-PC\SQLEXPRESS; Initial Catalog=Asientos; Integrated Security=true;";
            SqlConnection Connect = new SqlConnection(conectServer);
            Connect.Open();
            return Connect;
        }
    }
}
