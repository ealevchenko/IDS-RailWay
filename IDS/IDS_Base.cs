using IDSLogs.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IDS
{
    public enum errors_base : int
    {
        global = -1,
        cancel_save_changes = -2,       // Отмена сохранений изменений в базе данных (были ошибки по ходу выполнения всей операции)
        error_save_changes = -3,        // Были ошибки по ходу выполнения всей операций
        // Обшие входные переменые -100...
        not_input_value = -100,
        // таблица wir -200...
        not_wir_db = -201,                  // В базе данных нет записи по WagonInternalRoutes (Внутренее перемещение вагонов)
        // таблица wim -300...
        not_wim_db = -301,                  // В базе данных нет записи по WagonInternalMovement (Внутреняя дислокация вагонов)
        // таблица wio -400...
        not_wio_db = -401,                  // В базе данных нет записи по WagonInternalOperation (Внутреняя операция по вагону)
        look_operation = -402,              // Операция над вагонами заблокирована (Вагон предъявлен на УЗ)
        // Справочники -1000.....
        // Directory_Ways -1100..
        not_dir_way_db = -1101,             // В базе данных нет записи указаной строки пути
        way_not_crossing_uz = -1102,        // Путь неимеет выход на УЗ



        //not_sostav = -101, //...
        //not_wagon = -102,
        //not_arrival_wir = -103,         // Нет записи [WagonInternalRoutes] зашедшей на АМКР
        //not_open_wir = -104,            // Нет открытой записи положения вагона. (Если вагон защел тогда вагон всегда должен гдето стоять!)
        //not_set_way_wir = -105,         // Нет вагон стоит не натом пути по которому нужно провести операцию.
        //not_way_on = -106,              // Неуказан путь приема


    }
    
    
    
    public class ResultWagon
    {
        public int num { get; set; }
        public int result { get; set; }
    }

    public class ResultID
    {
        public long id { get; set; }
        public int result { get; set; }
    }
    /// <summary>
    /// Класс данных результата выполнения переноса
    /// </summary>
    public class ResultTransfer
    {
        public int result { get; set; } // Глобальный ресурс выполнения всего переноса
        public int count { get; set; }
        public int moved { get; set; }
        public int skip { get; set; }
        public int error { get; set; }
        public List<ResultWagon> listResult = new List<ResultWagon>();

        public ResultTransfer(int count)
        {
            this.count = count;
            this.result = 0;
            this.moved = 0;
            this.skip = 0;
            this.error = 0;
            this.listResult.Clear();
        }

        public void SetMovedResult(int result)
        {
            if (result < 0)
            {
                AddError(result); return;
            }
            if (result > 0)
            {
                AddMoved(); return;
            }
            AddSkip();
            return;
        }
        public void SetMovedResult(int result, int num)
        {
            listResult.Add(new ResultWagon() { num = num, result = result });

            if (result < 0)
            {
                AddError(result); return;
            }
            if (result > 0)
            {
                AddMoved(); return;
            }
            AddSkip();
            return;
        }
        public void SetResult(int code)
        {
            this.result = code;
        }
        public void AddMoved()
        {
            this.moved++;
        }
        public void AddSkip()
        {
            this.skip++;
        }
        public void AddError(int err_code)
        {
            this.error++;
        }
        public void AddError()
        {
            this.error++;
        }
    }
    /// <summary>
    /// Класс данных результата выполнения обнавлений
    /// </summary>
    public class ResultUpdateWagon
    {
        public int result { get; set; } // Глобальный ресурс выполнения всего переноса
        public int count { get; set; }
        public int update { get; set; }
        public int skip { get; set; }
        public int error { get; set; }
        public int close { get; set; }
        public List<ResultWagon> listResult = new List<ResultWagon>();

        public ResultUpdateWagon(int count)
        {
            this.count = count;
            this.result = 0;
            this.update = 0;
            this.skip = 0;
            this.error = 0;
            this.close = 0;
            this.listResult.Clear();
        }

        public void SetUpdateResult(int result)
        {
            if (result < 0)
            {
                AddError(result); return;
            }
            if (result > 0)
            {
                AddUpdate(); return;
            }
            AddSkip();
            return;
        }
        public void SetUpdateResult(int result, int num)
        {
            listResult.Add(new ResultWagon() { num = num, result = result });

            if (result < 0)
            {
                AddError(result); return;
            }
            if (result > 0)
            {
                AddUpdate(); return;
            }
            AddSkip(); return;
        }
        public void SetResult(int code)
        {
            this.result = code;
        }
        public void AddUpdate()
        {
            this.update++;
        }
        public void AddSkip()
        {
            this.skip++;
        }
        public void AddError(int err_code)
        {
            this.error++;
        }
        public void AddError()
        {
            this.error++;
        }
        public void AddClose()
        {
            this.close++;
        }
    }

    public class ResultUpdateID
    {
        public int result { get; set; } // Глобальный ресурс выполнения всего переноса
        public int count { get; set; }
        public int update { get; set; }
        public int skip { get; set; }
        public int error { get; set; }
        public int close { get; set; }
        public List<ResultID> listResult = new List<ResultID>();

        public ResultUpdateID(int count)
        {
            this.count = count;
            this.result = 0;
            this.update = 0;
            this.skip = 0;
            this.error = 0;
            this.close = 0;
            this.listResult.Clear();
        }

        public void SetUpdateResult(int result)
        {
            if (result < 0)
            {
                AddError(result); return;
            }
            if (result > 0)
            {
                AddUpdate(); return;
            }
            AddSkip();
            return;
        }
        public void SetUpdateResult(int result, long id)
        {
            listResult.Add(new ResultID() { id = id, result = result });

            if (result < 0)
            {
                AddError(result); return;
            }
            if (result > 0)
            {
                AddUpdate(); return;
            }
            AddSkip(); return;
        }
        public void SetCloseResult(int result, long id)
        {
            listResult.Add(new ResultID() { id = id, result = result });

            if (result < 0)
            {
                AddError(result); return;
            }
            if (result > 0)
            {
                AddClose(); return;
            }
            AddSkip(); return;
        }

        public void SetResult(int code)
        {
            this.result = code;
        }
        public void AddUpdate()
        {
            this.update++;
        }
        public void AddSkip()
        {
            this.skip++;
        }
        public void AddError(int err_code)
        {
            this.error++;
        }
        public void AddError()
        {
            this.error++;
        }
        public void AddClose()
        {
            this.close++;
        }
    }
    /// <summary>
    /// Класс данных результатов выполнения нескольких переносов.
    /// </summary>
    public class ListResultTransfer
    {
        public int result { get; set; } // Глобальный ресурс выполнения всего переноса
        public int count { get; set; }
        public int moved { get; set; }
        public int skip { get; set; }
        public int error { get; set; }
        public List<ResultTransfer> list_rs = new List<ResultTransfer>();

        public ListResultTransfer()
        {
            this.count = 0;
            this.result = 0;
            this.moved = 0;
            this.skip = 0;
            this.error = 0;
            list_rs.Clear();
        }

        public void AddResultTransfer(ResultTransfer rs)
        {
            if (rs == null) return;
            list_rs.Add(rs);
            this.count += rs.count;
            this.result = rs.result < 0 ? rs.result : (this.result + rs.result); // Заменим если ошибка
            this.moved += rs.moved;
            this.skip += rs.skip;
            this.error += rs.error;
            return;
        }
        public void SetResult(int code)
        {
            this.result = code;
        }

    }

    public class OperationResultWagon
    {
        public int result { get; set; } // Глобальный ресурс выполнения всего переноса
        public int error { get; set; } // количество ошибок
        public List<ResultWagon> listResultWagon = new List<ResultWagon>();


        public OperationResultWagon()
        {
            this.result = 0;
            this.error = 0;
        }

        public void SetResult(int code)
        {
            this.result = code;
        }
        public void AddError()
        {
            this.error++;
        }
        public void SetResultOperation(int result, int num)
        {
            this.listResultWagon.Add(new ResultWagon() { num = num, result = result });
            if (result < 0) { AddError(); }
        }
    }

    public class OperationResultID
    {
        public int result { get; set; } // Глобальный ресурс выполнения всего переноса
        public int error { get; set; } // количество ошибок
        public List<ResultID> listResult = new List<ResultID>();


        public OperationResultID()
        {
            this.result = 0;
            this.error = 0;
        }

        public void SetResult(int code)
        {
            this.result = code;
        }

        public void AddError()
        {
            this.error++;
        }

        public void SetResultOperation(int result, long id)
        {
            this.listResult.Add(new ResultID() { id = id, result = result });
            if (result < 0) { AddError(); }
        }
    }


    public class IDS_Base
    {
        protected service servece_owner = service.Null;

        public IDS_Base()
        {

        }

        public IDS_Base(service servece_owner)
        {
            this.servece_owner = servece_owner;
        }
    }
}
