namespace Web2_projekat.Exceptions
{
    public class InvalidFieldsException : Exception
    {
        public InvalidFieldsException()
        {
        }

        public InvalidFieldsException(string message) : base(message)
        {
        }

        public InvalidFieldsException(string message, Exception innerException) : base(message, innerException)
        {
        }
    }
}
