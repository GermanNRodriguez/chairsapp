namespace Reservar
{
    public class Administrador
    {
        public string NombreC { get; set; }
        public string Contraseña { get; set; }

        public Administrador(string nom, string con)
        {
            this.NombreC = nom;
            this.Contraseña = con;
        }
        public Administrador() { }
    }
}
