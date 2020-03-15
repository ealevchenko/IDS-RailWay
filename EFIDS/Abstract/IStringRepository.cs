using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EFIDS.Abstract
{
    public interface IStringRepository<T> : IDisposable where T : class
    {
        Database Database { get; }
        IQueryable<T> Context { get; }
        IEnumerable<T> Get();       // получение всех объектов
        T Get(string id);              // получение одного объекта по id
        void Add(T item);           // создание объекта
        void Add(IEnumerable<T> items);           // создание объекта
        void Update(T item);        // обновление объекта
        void AddOrUpdate(T item);   // добавить или обновить
        void Delete(string id);        // удаление объекта по id
        int Save();                 // сохранение изменений в базе
        T Refresh(T item);          // Обновить объект с базаой
    }
}
