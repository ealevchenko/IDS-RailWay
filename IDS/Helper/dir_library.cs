using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IDS.Helper
{
    public static class dir_library
    {
        #region Методы работы с путями

        #endregion

        public static bool IsCorrectNumCar(this int num)
        {
            try
            {
                if (num < 10000000) return false;
                if (num > 99999999) return false;

                string number = num.ToString().Remove(num.ToString().Length - 1);
                int cs = int.Parse(num.ToString().Remove(0, num.ToString().Length - 1));
                char[] array = number.ToCharArray();
                int[] kof = new int[7] { 2, 1, 2, 1, 2, 1, 2 };
                int result = 0;
                int index = 0;
                foreach (char n in array)
                {
                    int n_i = int.Parse(n.ToString());
                    int res_i = n_i * kof[index];
                    index++;
                    // скорректируем
                    if (res_i > 9)
                    {
                        string res_kor_i = res_i.ToString();
                        res_i = int.Parse(res_kor_i[0].ToString()) + int.Parse(res_kor_i[1].ToString());
                    }
                    result += res_i;
                }

                result = result + cs;

                double ost = result % 10.0;
                return ost == 0.0 ? true : false;
            }
            catch (Exception e)
            {
                return false;
            }
        }
    }
}
