using Reservar;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;


namespace Access
{
    public class Functions
    {
        public static List<Persona> ObtainPeople()// Obtener todas las Personas
        {
            SqlConnection Connect = Access.Connect(); 
            List<Persona> Personas = new List<Persona>();
            SqlCommand Command = new SqlCommand("obtainPersona", Connect);
            Command.CommandType = System.Data.CommandType.StoredProcedure;
            SqlDataReader DataReader = Command.ExecuteReader();

            while (DataReader.Read())
            {
                Persona Person = new Persona();
                Person.nroUsuario = DataReader.GetInt32(0);
                Person.Nombre = DataReader.GetString(1);
                Person.Apellido = DataReader.GetString(2);
                Person.DNI = DataReader.GetInt32(3);
                Person.Direccion = DataReader.GetString(4);
                Person.Grupo = DataReader.GetInt32(5);
                Personas.Add(Person);
            }
            Connect.Close();
            return Personas;
        }
        public static List<Reserva> ObtainReservation()
        {
            List<Reserva> Reservas = new List<Reserva>();
            SqlConnection Connect = Access.Connect();
            SqlCommand Command = new SqlCommand("obtainReserva", Connect);
            Command.CommandType = System.Data.CommandType.StoredProcedure;
            SqlDataReader DataReader = Command.ExecuteReader();

            while (DataReader.Read())
            {
                Reserva Reserv = new Reserva();
                Reserv.idReserva = DataReader.GetInt32(0);
                Reserv.usuRes = DataReader.GetString(1);
                Reserv.Cantidad = DataReader.GetInt32(2);
                Reserv.idReu = DataReader.GetInt32(3);

                Reservas.Add(Reserv);
            }
            return Reservas;
        }// Obtiene todas las reservas
        public static List<Grupo> ObtainGroup()
        {
            List<Grupo> Grupos = new List<Grupo>();
            SqlConnection Connect = Access.Connect();
            SqlCommand Command = new SqlCommand("obtainGrupo", Connect);
            Command.CommandType = System.Data.CommandType.StoredProcedure;
            SqlDataReader DataReader = Command.ExecuteReader();

            while (DataReader.Read())
            {
                Grupo Grupo = new Grupo();
                Grupo.nroGrupo = DataReader.GetInt32(0);
                Grupo.Usuario = DataReader.GetString(1);
                Grupo.Contraseña = DataReader.GetString(2);
                Grupo.Cantidad = DataReader.GetInt32(3);

                Grupos.Add(Grupo);
            }
            return Grupos;
        }// Obtiene todos los grupos
        public static List<Reunion> ObtainMeeting()
        {
            List<Reunion> Reuniones = new List<Reunion>();
            SqlConnection Connect = Access.Connect();
            SqlCommand Command = new SqlCommand("obtainReunion", Connect);
            Command.CommandType = System.Data.CommandType.StoredProcedure;
            SqlDataReader DataReader = Command.ExecuteReader();

            while (DataReader.Read())
            {
                Reunion Reunion = new Reunion();
                Reunion.nroReunion = DataReader.GetInt32(0);
                Reunion.fecha = DataReader.GetString(1);
                Reunion.hora = DataReader.GetString(2);
                Reunion.cantMax = DataReader.GetInt32(3);

                Reuniones.Add(Reunion);
            }
            return Reuniones;
        }// Obtiene todas las reuniones
        public static List<Administrador> ObtainAdmin(Administrador Admin)
        {
            SqlConnection Connect = Access.Connect();
            List<Administrador> lista = new List<Administrador>();
            SqlCommand Command = new SqlCommand("obtainAdmin", Connect);
            Command.CommandType = System.Data.CommandType.StoredProcedure;
            SqlDataReader DataReader = Command.ExecuteReader();
            while (DataReader.Read())
            {
                Administrador administrador = new Administrador();
                administrador.NombreC = DataReader.GetString(0);
                administrador.Contraseña = DataReader.GetString(1);

                lista.Add(administrador);
            }

            Connect.Close();
            return lista;
        }// Obtiene todos los admins
        public static string ObtainMensaje(Administrador Admin)
        {
            string Mensaje = "Usuario o contraseña incorrectos";

            List<Administrador> lista = new List<Administrador>();
            SqlConnection Connect = Access.Connect();
            SqlCommand Command = new SqlCommand("obtainAdmin", Connect);
            Command.CommandType = System.Data.CommandType.StoredProcedure;
            try
            {
                SqlDataReader DataReader = Command.ExecuteReader();
                while (DataReader.Read())
                {
                    Administrador administrador = new Administrador();
                    administrador.NombreC = DataReader.GetString(0);
                    administrador.Contraseña = DataReader.GetString(1);

                    lista.Add(administrador);
                }
                for (int i = 0; i < lista.Count; i++)
                {
                    if ((Admin.NombreC.Equals(lista[i].NombreC))&&(Admin.Contraseña.Equals(lista[i].Contraseña)))
                    {
                        Mensaje = "Usuario correcto";
                    }
                }
            }
            catch { Mensaje = "Error al entrar a la base de datos"; }
            Connect.Close();
            return Mensaje;
        }// Obtiene el mensaje para aprobar al admin
        public static int ObtainNumberGroup (Grupo grupo)
        {
            int nroGrupo;
            SqlConnection Connection = Access.Connect();
            SqlCommand comando = new SqlCommand("obtainNroGrupo", Connection);
            comando.CommandType = System.Data.CommandType.StoredProcedure;
            comando.Parameters.AddWithValue("@Usuario", grupo.Usuario);
            SqlDataReader Reader = comando.ExecuteReader();
            Reader.Read();
            nroGrupo = Reader.GetInt32(0);

            Connection.Close();
            return nroGrupo;
        }//Obtiene el número de un grupo
        public static string ObtainExistGroup(Grupo grupo)
        {
            int cantidadRepetidas;
            SqlConnection Connection = Access.Connect();
            SqlCommand Command = new SqlCommand("obtainComprobarGrupo", Connection);
            Command.CommandType = System.Data.CommandType.StoredProcedure;
            Command.Parameters.AddWithValue("@Usuario", grupo.Usuario);
            Command.Parameters.AddWithValue("@Contraseña", grupo.Contraseña);
            SqlDataReader DataReader = Command.ExecuteReader();
            DataReader.Read();
            cantidadRepetidas = DataReader.GetInt32(0);
            Connection.Close();
            if (cantidadRepetidas == 1)
            {
                return "Usuario ingresado correctamente";
            } else
            {
                return "Ingresó mal el usuario o la contraseña";
            }
        }//Comprueba si coinciden Usuario y Contraseña en la BBDD
        public static List<Grupo> ObtainOneGroup(int id)
        {
            SqlConnection Connection = Access.Connect();
            List<Grupo> grupos = new List<Grupo>();
            SqlCommand Command = new SqlCommand("obtainUnGrupo", Connection);
            Command.CommandType = System.Data.CommandType.StoredProcedure;
            Command.Parameters.AddWithValue("@nroGrupo", id);
            SqlDataReader DataReader = Command.ExecuteReader();

            while (DataReader.Read())
            {
                Grupo grupo = new Grupo();
                grupo.nroGrupo = DataReader.GetInt32(0);
                grupo.Usuario = DataReader.GetString(1);
                grupo.Contraseña = DataReader.GetString(2);
                grupo.Cantidad = DataReader.GetInt32(3);

                grupos.Add(grupo);
            }
            Connection.Close();
            return grupos;
        }

        public static void SavePerson(Persona Person)
        {
            SqlConnection Connection = Access.Connect();
            SqlCommand Command = new SqlCommand("insertPersona", Connection);
            Command.CommandType = System.Data.CommandType.StoredProcedure;

            Command.Parameters.AddWithValue("@Nombre", Person.Nombre);
            Command.Parameters.AddWithValue("@Apellido", Person.Apellido);
            Command.Parameters.AddWithValue("@DNI", Person.DNI);
            Command.Parameters.AddWithValue("@Direccion", Person.Direccion);
            Command.Parameters.AddWithValue("@nroGrupo", Person.Grupo);

            Command.ExecuteNonQuery();
            Connection.Close();
        }//Guarda una persona, acorde al nro de grupo
        public static void SaveReservationt(Reserva Reserv)
        {
            SqlConnection Connection = Access.Connect();
            SqlCommand Command = new SqlCommand("insertReserva", Connection);
            Command.CommandType = System.Data.CommandType.StoredProcedure;

            Command.Parameters.AddWithValue("@Usuario", Reserv.usuRes);
            Command.Parameters.AddWithValue("@Cantidad", Reserv.Cantidad);
            Command.Parameters.AddWithValue("@idReunion", Reserv.idReu);

            Command.ExecuteNonQuery();

            Connection.Close();
        }//No testeado. Guarda una reserva
        public static int SaveGroup(Grupo Group)
        {
            Group.nroGrupo = 0;
            int cantidadRepetidas;
            SqlConnection Connection = Access.Connect();
            SqlCommand Command = new SqlCommand("obtainExisteGrupo", Connection);
            Command.CommandType = System.Data.CommandType.StoredProcedure;
            Command.Parameters.AddWithValue("@Usuario", Group.Usuario);
            SqlDataReader DataReader = Command.ExecuteReader();
            DataReader.Read();
            cantidadRepetidas = DataReader.GetInt32(0);


            if (cantidadRepetidas == 0)
            {
                DataReader.Close();
                SqlCommand commandq = new SqlCommand("insertGrupo", Connection);
                commandq.CommandType = System.Data.CommandType.StoredProcedure;
                commandq.Parameters.AddWithValue("@Usuario", Group.Usuario);
                commandq.Parameters.AddWithValue("@Contraseña", Group.Contraseña);
                commandq.Parameters.AddWithValue("@Cantidad", Group.Cantidad);
                commandq.Parameters.AddWithValue("@nroGrupo", Group.nroGrupo);
                commandq.ExecuteNonQuery();

                SqlConnection conexion = Access.Connect();
                SqlCommand comando = new SqlCommand("obtainNroGrupo", Connection);
                comando.CommandType = System.Data.CommandType.StoredProcedure;
                comando.Parameters.AddWithValue("@Usuario", Group.Usuario);
                SqlDataReader Reader = comando.ExecuteReader();
                Reader.Read();
                Group.nroGrupo = Reader.GetInt32(0);       
            } else
            {
                Group.nroGrupo = 0;
            }
            Connection.Close();
            return Group.nroGrupo;
        }//Guarda un grupo
        public static void SaveMeeting(Reunion Reu)
        {
            SqlConnection Connection = Access.Connect();
            SqlCommand Command = new SqlCommand("insertReunion", Connection);
            Command.CommandType = System.Data.CommandType.StoredProcedure;

            Command.Parameters.AddWithValue("@Fecha", Reu.fecha);
            Command.Parameters.AddWithValue("@Hora", Reu.hora);
            Command.Parameters.AddWithValue("@Cantidad", Reu.cantMax);

            Command.ExecuteNonQuery();
            Connection.Close();
        }//Guarda una reunion

        public static void DeleteReservation(Reserva Res)
        {
            SqlConnection Connection = Access.Connect();
            SqlCommand Command = new SqlCommand("deleteReserva", Connection);
            Command.CommandType = System.Data.CommandType.StoredProcedure;

            Command.Parameters.AddWithValue("@idReserva", Res.idReserva);

            Command.ExecuteNonQuery();
            Connection.Close();
        }// No testeado. Borra una reserva
        public static void DeleteMeeting(Reunion Reu)
        {
            SqlConnection Connection = Access.Connect();
            SqlCommand Command = new SqlCommand("deleteReunion", Connection);
            Command.CommandType = System.Data.CommandType.StoredProcedure;

            Command.Parameters.AddWithValue("@NroReunion", Reu.nroReunion);

            Command.ExecuteNonQuery();
            Connection.Close();
        }// No testeado. Borra una reunión

        public static void UpdateMeeting(Reunion Reu) {
            SqlConnection Connection = Access.Connect();
            SqlCommand Command = new SqlCommand("updateReunion", Connection);
            Command.CommandType = System.Data.CommandType.StoredProcedure;

            Command.Parameters.AddWithValue("@Reunion", Reu.nroReunion);
            Command.Parameters.AddWithValue("@nuevaCant", Reu.cantMax);

            Command.ExecuteNonQuery();

            Connection.Close();
        }// No testeado. Corrije la hora de una reunión
        

    }
}
