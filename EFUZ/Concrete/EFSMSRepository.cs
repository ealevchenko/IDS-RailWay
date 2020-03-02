using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EFUZ.Concrete
{
    public static class EFSMSRepository
    {
        public static IQueryable<TEntity> Select<TEntity>(this EFSMSDbContext context) where TEntity : class
        {

            // Здесь мы можем указывать различные настройки контекста,
            // например выводить в отладчик сгенерированный SQL-код
            //context.Database.Log =
            //    (s => System.Diagnostics.Debug.WriteLine(s));

            // Загрузка данных с помощью универсального метода Set
            return context.Set<TEntity>();
        }

        public static TEntity Select<TEntity>(this EFSMSDbContext context, long id) where TEntity : class
        {

            // Здесь мы можем указывать различные настройки контекста,
            // например выводить в отладчик сгенерированный SQL-код
            //context.Database.Log =
            //    (s => System.Diagnostics.Debug.WriteLine(s));

            // Загрузка данных с помощью универсального метода Set
            return context.Set<TEntity>().Find(id);
        }

        public static TEntity Select<TEntity>(this EFSMSDbContext context, string id) where TEntity : class
        {

            // Здесь мы можем указывать различные настройки контекста,
            // например выводить в отладчик сгенерированный SQL-код
            //context.Database.Log =
            //    (s => System.Diagnostics.Debug.WriteLine(s));

            // Загрузка данных с помощью универсального метода Set
            return context.Set<TEntity>().Find(id);
        }

        public static void Insert<TEntity>(this EFSMSDbContext context, TEntity entity) where TEntity : class
        {
            // Здесь мы можем указывать различные настройки контекста,
            // например выводить в отладчик сгенерированный SQL-код
            //context.Database.Log =
            //    (s => System.Diagnostics.Debug.WriteLine(s));

            context.Entry(entity).State = EntityState.Added;
        }
        /// <summary>
        /// Запись нескольких полей в БД
        /// </summary>
        public static void Inserts<TEntity>(this EFSMSDbContext context, IEnumerable<TEntity> entities) where TEntity : class
        {

            // Отключаем отслеживание и проверку изменений для оптимизации вставки множества полей
            context.Configuration.AutoDetectChangesEnabled = false;
            context.Configuration.ValidateOnSaveEnabled = false;

            //context.Database.Log = (s => System.Diagnostics.Debug.WriteLine(s));

            foreach (TEntity entity in entities)
                context.Entry(entity).State = EntityState.Added;


            context.Configuration.AutoDetectChangesEnabled = true;
            context.Configuration.ValidateOnSaveEnabled = true;
        }

        public static void Update<TEntity>(this EFSMSDbContext context, TEntity entity) where TEntity : class
        {
            // Здесь мы можем указывать различные настройки контекста,
            // например выводить в отладчик сгенерированный SQL-код
            //context.Database.Log =
            //    (s => System.Diagnostics.Debug.WriteLine(s));

            context.Entry(entity).State = EntityState.Modified;
        }

        public static TEntity Delete<TEntity>(this EFSMSDbContext context, long id) where TEntity : class
        {
            // Здесь мы можем указывать различные настройки контекста,
            // например выводить в отладчик сгенерированный SQL-код
            //context.Database.Log =
            //    (s => System.Diagnostics.Debug.WriteLine(s));

            TEntity item = context.Set<TEntity>().Find(id);
            if (item != null)
                context.Entry<TEntity>(item).State = EntityState.Deleted;
            return item;
        }

    }
}
