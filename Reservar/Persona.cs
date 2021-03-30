namespace Reservar
{
    public class Persona
    {
        public int nroUsuario { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public int DNI { get; set; }
        public string Direccion { get; set; }
        public int Grupo { get; set; }

        public Persona(int usu, string nom, string ape, int dni, string dire, int gr)
        {
            this.nroUsuario = usu;
            this.Nombre = nom;
            this.Apellido = ape;
            this.DNI = dni;
            this.Direccion = dire;
            this.Grupo = gr;
        }

        public Persona()
        {
        }
    }
}
