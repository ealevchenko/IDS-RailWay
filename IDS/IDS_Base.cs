using IDSLogs.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IDS
{
    public class ResultWagon
    {
        public int num { get; set; }
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

    public class OperationResult
    {
        public int result { get; set; } // Глобальный ресурс выполнения всего переноса
        public int error { get; set; } // количество ошибок
        public List<ResultWagon> listResultWagon = new List<ResultWagon>();


        public OperationResult()
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
