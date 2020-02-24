using IDSLogs.Enum;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml;
using System.Xml.Serialization;
using UZ;

namespace Test.TestModule
{
    public class OTPR
    {
        public DateTime? date_finish { get; set; }
        public DateTime? date_plan { get; set; }
        public DateTime? date_strah_dog_recipient { get; set; }
        public DateTime? date_vid { get; set; }
        public string deliv_note { get; set; }
        public string street { get; set; }
        public string ser_passp { get; set; }
        public int? strah_komp_recipient { get; set; }
        public string name_strah_komp_recipient { get; set; }
        public int? nom_passp { get; set; }
        public int? nom_dover { get; set; }
        public string nom_strah_polis_recipient { get; set; }
        public string house { get; set; }
        public DateTime? date_dover { get; set; }
        public string city { get; set; }
        public int? apartam { get; set; }
        public int? rab_esr_pr { get; set; }
        public DateTime? date_pr { get; set; }
        public DateTime? date_grpol { get; set; }
        public int? sum_pereb { get; set; }
        public int? sum_deliv { get; set; }
        public string ser_doc { get; set; }
        public string pr_distance { get; set; }
        public int? osum { get; set; }
        public int? distance_way { get; set; }
        public string doc_lang { get; set; }
        public DateTime? date_otpr { get; set; }
        public int? country_nazn { get; set; }
        public int? country_otpr { get; set; }
        public string esr_nakop { get; set; }
        public string esr_rz_marsh_grot { get; set; }
        public int? foreign_not_accept { get; set; }
        public string freeze { get; set; }
        public int? kod_doc { get; set; }
        public string kod_marsh_grot { get; set; }
        public string loader { get; set; }
        public string measure_equip_num { get; set; }
        public int? metod { get; set; }
        public int? nom_doc { get; set; }
        public int? nom_marsh_grot { get; set; }
        public int? nom_plan { get; set; }
        public int? nоm_park { get; set; }
        public int? pr_freeze { get; set; }
        public string pr_locom { get; set; }
        public string pr_vohr { get; set; }
        public string priznak { get; set; }
        public int? rab_esr { get; set; }
        public string speed { get; set; }
        public DateTime? srok_end { get; set; }
        public string type_pay { get; set; }
        public int? val_gr { get; set; }
        public int? value { get; set; }
        public string vid { get; set; }
        public int? vid_marsh { get; set; }
        public int? vid_nakaz_pr { get; set; }
        public string vid_perev { get; set; }
        public int? vmd_nom_declar { get; set; }
        public int? vmd_nom_custom { get; set; }
        public int? vmd_year_declar { get; set; }
        public DateTime? vmd_date_declar { get; set; }
        // ACTS
        // CARRIER
        // CIM_INFO (1)
        public CLIENT[] client = new CLIENT[] { }; // (2)
                                                   // COM_COND (~)
                                                   // CONT (~)
                                                   // FRONTIER_MARK (~)
                                                   // OTPRDP (0..1)
                                                   // PAC (0..1)
                                                   // PASS_MARK (~)
        public PL[] pl = new PL[] { }; // (~)
                                       // PROLONGATION (~)
        public ROUTE[] route = new ROUTE[] { };// (~)
        // RW_STAT (~)
        // REFUSE_EPD (0..1)
        // REISSUE_INFO (0..1)
        // SCHEMA (0..10)
        // SENDER_DOC (~)
        // SEND_STAT (~)
        public SHTEMPEL[] shtempel = new SHTEMPEL[] { }; // (~)
        public SPEC_COND[] spec_cond = new SPEC_COND[] { }; // (~)
        //TAKS (0..1)
        public TEXT text { get; set; } // (0..1)
        public VAGON[] vagon = new VAGON[] { }; // (0..120)
    }

    public class CLIENT
    {
        public string account { get; set; }
        public string adress { get; set; }
        public string bank { get; set; }
        public string business_unit_num { get; set; }
        public int? carrier_kod { get; set; }
        public string carrier_name { get; set; }
        public string city { get; set; }
        public string email { get; set; }
        public string fax { get; set; }
        public string kod { get; set; }
        public string mfo { get; set; }
        public string name { get; set; }
        public string nds_pay_code { get; set; }
        public string okpo { get; set; }
        public string phone { get; set; }
        public string representative_pib { get; set; }
        public string type { get; set; }
        public CLIENT_LOC[] client_loc = new CLIENT_LOC[] { }; // (2)
    }

    public class CLIENT_LOC
    {
        public string adress { get; set; }
        public string lang { get; set; }
        public string name { get; set; }
    }

    public class PL
    {
        public int? carrier_kod { get; set; }	        //	Код перевізника
        public string carrier_name { get; set; }	    //	Скорочене найменування перевізника
        public int? currency { get; set; }	            //	Бажана валюта сплати транзитного платника 
        public DateTime? date_carrier_dog { get; set; }	//	Дата укладення договору між перевізником та платником за перевезення
        public int? kod_adm { get; set; }	            //	Код адміністрації платника (вказується тільки для транзитних платників)
        public string kod_plat { get; set; }	        //	Код платника (для платника по відправленню/прибуттю — код з 7 цифр,  для транзитного платника по АТ «Укрзалізниця»; — 10 цифр, інші — до 20 символів).
        public string name_plat { get; set; }	        //	Найменування платника
        public string num_carrier_dog { get; set; }	    //	Номер договору укладеного між перевізником та платником за перевезення
        public int? podkod_exp { get; set; }	        //	Підкод платника (експедитора) 
        public int? sector_num { get; set; }	        //	Номер ділянки
        public string type { get; set; }	            //	Тип платника
        public PAY[] pay = new PAY[] { }; // (~)
        public PL_LOC pl_loc { get; set; } // (1)
}

    public class PAY
    {
        public int? currency { get; set; }	//	Тризначний код валюти платежу
        public DateTime? date { get; set; }	//	Дата призначення платежу
        public string kod { get; set; }	    //	Код платежу 
        public int? nom_doc { get; set; }	//	Номер ГУ-57
        public string podkod { get; set; }	//	Підкод платежу 
        public string pr_avt { get; set; }	//	Ознака автоматичного нарахування платежу
        public string ser_doc { get; set; }	//	Серія документу 
        public string stn { get; set; }	    //	Код станції призначення платежу
        public int? summa { get; set; }	    //	Cума платежу (коп.)
    }

    public class PL_LOC
    {
        public string adress { get; set; }	//	Адреса платника (для ЦІМ та ЦІМ/СМГС бланка)
        public string lang { get; set; }	//	Двозначний код мови по стандарту ІSO 639.1 (для ЦІМ та ЦІМ/СМГС бланка)
        public string name { get; set; }	//	Найменування платника (для ЦІМ та ЦІМ/СМГС бланка)
    }

    public class ROUTE
    {
        public int? index { get; set; }	        //	Порядковий номер маршруту прямування (нумерація ведеться з 0)
        public string stn_from { get; set; }	//	Код станції відправлення
        public string name_from { get; set; }	//	Найменування станції відправлення
        public int? rw_from { get; set; }	    //	Адміністрація станції відправлення
        public string stn_to { get; set; }	    //	Код станції призначення
        public string name_to { get; set; }	    //	Найменування станції призначення
        public int? rw_to { get; set; }	        //	Адміністрація станції призначення
        public int? zd_nazn { get; set; }	    //	Код залізниці призначення
        public int? zd_otpr { get; set; }	    //	Код залізниці відправлення
        public JOINT[] joint = new JOINT[] { }; // {0..100}
        public PEREADR_INFO pereadr_info { get; set; }
        public ROUTE_LOC route_loc { get; set; }
    }
    
    public class JOINT
    {
        public DateTime? cross_time { get; set; }	//	Дата та час перетину кордону
        public string direction { get; set; }	    //	Напрямок при перетині кордону
        public string port_name { get; set; }	    //	Найменування порту перехідного стикового пункту
        public string stn { get; set; }	            //	Код станції перетину кордону
        public string stn_name { get; set; }	    //	Найменування станції перетину кордону
        public int? admin { get; set; }	            //	Код залізничної адміністрації станції перетину кордону
        public int? zd_kod { get; set; }	        //	Код залізниці прикордонної станції
        public JOINT_LOC joint_loc { get; set; }  // {0..1}
    }

    public class JOINT_LOC
    {
        public string stn_name { get; set; }	//	Найменування станції перетину кордону на другій мові перевізного документа (для ЦІМ та ЦІМ/СМГС бланка)
        public string lang { get; set; }	//	Двозначный код другої  мови по стандарту ІSO 639.1 (для ЦІМ та ЦІМ/СМГС бланка)
    }

    public class PEREADR_INFO
    {
        public DateTime? date_nakaz { get; set; }	//	Дата наказу на переадресування вантажу
        public DateTime? date_pereadr { get; set; }	//	Дата здійснення операції переадресування за первинним перевізним документом
        public int? distance { get; set; }	//	Відстань від станції переадресування до станції призначення (у км)
        public string nakaz { get; set; }	//	Номер наказу на переадресування вантажу
        public int? nom_perv_doc { get; set; }	//	Номер первинного перевізного документа
        public string ser_perv_doc { get; set; }	//	Серія первинного перевізного документа
        public string type_pay_old { get; set; }	//	Вид розрахунку у перевізному документі до переадресування
    }

    public class ROUTE_LOC
    {
        public string lang { get; set; }	//	Двозначний код другої мови перевізного документа по стандарту ІSO 639.1 (для ЦІМ та ЦІМ/СМГС бланка)
        public string name_from { get; set; }	//	Код залізниці відправлення
        public string name_to { get; set; }	//	Код залізниці призначення
    }

    public class SHTEMPEL
    {
        public string column_num { get; set; }	//	Код графи перевізного документа
        public string info_sht { get; set; }	//	Текст штемпеля/відмітки
        public int? nom_sht { get; set; }	    //	Номер (код) штемпеля/відмітки, з класифікатора штемпелів та відміток
    }

    public class SPEC_COND
    {
        public int? code { get; set; }	//
        public string name_metal { get; set; }	//
        public string name_val { get; set; }	//
        public string val { get; set; }	//
    }

    public class TEXT
    {
        public string branch { get; set; }	//	Найменування власника під'їзної колії 
        public string calc_reason { get; set; }	//	Підстави для розрахунку
        public int? carrier_from { get; set; }	//	Компанія-перевізник при відправленні з країн ЦІМ
        public string create_place { get; set; }	//	Місце оформлення
        public string create_place_de { get; set; }	//	Місце оформлення німецькою мовою (для ЦІМ та ЦІМ/СМГС бланка)
        public DateTime? date_permit { get; set; }	//	Дата надання дозволу/довіреності на право використання власного вагона
        public string doc_grot { get; set; }	//	Документи, прикладені вантажовідправником (заповнюється касиром, при створенні нового документа. Якщо документ створює вантажовідправник, то прикладені документи вказуються у тезі SENDER_DOC).
        public string rwc_doc_name { get; set; }	//	Логічне ім'я документа
        public string rw_note { get; set; }	//	Відмітки залізниці 
        public string rw_mark { get; set; }	//	Марка залізниці
        public string name_tov { get; set; }	//	Призвище товарного кассиру, який оформив документ по відправленню 
        public string loader_fio { get; set; }	//	Прізвище та ім'я по батькові особи, відповідальної за навантаження
        public string loader_position { get; set; }	//	Посада особи, відповідальної за навантаження
        public string marks { get; set; }	//	Відмітки не обов'язкові для залізниці 
        public string marks_gr { get; set; }	//	Марки
        public string mount_chapter { get; set; }	//	Розділи ТУ , згідно яких закріплений вантаж
        public string mount_para { get; set; }	//	Параграфи ТУ , згідно яких закріплений вантаж
        public string name_gr { get; set; }	//	Додаткові відомості про вантаж
        public string nom_dog { get; set; }	//	Номер договору експорту/імпорту
        public string nom_gr { get; set; }	//	Номери
        public string nom_permit { get; set; }	//	Номер дозволу/довіреності на право використання власного вагона
        public int? outside_payer_code { get; set; }	//	Код платника за межами АТ «Укрзалізниця»;
        public string sing { get; set; }	//	Знаки 
        public string stn_accum { get; set; }	//	Код станції накопичення
        public string stn_name_accum { get; set; }	//	Найменування станції накопичення
        public string trans_plan { get; set; }	//	Номер транспортного плану
        public string zayava { get; set; }	    //	Особливі відмітки відправника
    }

    public class VAGON {
        public int? calc_weight { get; set; }   //	Розрахункова вага вантажу (кг)
        public string etsng_old { get; set; }   //	Код вантажу по ЄТСНВ, 
        public string gng_old { get; set; } //	Код вантажу по ГНВ, з-під якого був вивантажений вагон
        public double? gruzp { get; set; }  //	Вантажопід'ємність вагону (т)
        public string is_removed { get; set; }  //	Ознака викреслення вагона з перевізного документа при відчепленні
        public double? ostat_davl { get; set; } //	Залишковий тиск у котлу (МПа)
        public int? kod_adm { get; set; }   //	Код власника вагону 
        public string kod_firm_owner { get; set; }  //	Код компанії — власниці вагона
        public int? kol_conductor { get; set; } //	Кількість провідників
        public int? kol_os { get; set; }    //	Кількість вісей
        public string measure_equip_num { get; set; }   //	Заводський номер засобу вагоно-вимірювальної техніки
        public string name_firm_owner { get; set; } //	Найменування компанії — власниці вагона
        public int? negab_do { get; set; }  //	Індекс негабаритності додаткового обладнання
        public int? negab_rs { get; set; }  //	Індекс негабаритності рухомого складу
        public int? negab_v { get; set; }   //	Індекс негабаритності вантажу
        public int? nom_ref { get; set; }   //	Номер реф. секції
        public string nomer { get; set; }   //	Номер вагону (Обов'язкове поле для всіх відправок, окрім контейнерних)
        public DateTime? pour_off_date { get; set; }    //	Дата злиття цистерни
        public int? pr_sobst { get; set; }  //	Ознака власності вагону 
        public int? pr_zam { get; set; }    //	Ознака заміни вагону
        public string promoted_by { get; set; } //	Ознака надання вагону для перевезення
        public int? remove_weight { get; set; } //	Вага знімного устаткування (кг)
        public int? rod_vag { get; set; }   //	Род вагону
        public int? roller_weight { get; set; } //	Вага роллерів (кг)
        public int? tank_state { get; set; }    //	Стан цистерни після перевезення небезпечного вантажу
        public int? use { get; set; }   //	Ознака використання вагону
        public string usl_tip { get; set; } //	Тип цистерни
        public int? u_tara { get; set; }    //	Вага уточненої тари вагону (кг)
        public int? ves_tary_arc { get; set; }  //	Вага тари вагону (кг)
        public int? zd_kod { get; set; }    //	Код залізниці приписки вагона
    }

    public class PEREGR_V
    {
        public string esr_per { get; set; } //	Код станції перевантаження 
        public int? kol_devices { get; set; }   //	Кількість місць багатооборотних перевізних пристосувань
        public int? kol_pac { get; set; }   //	Кількість місць після перевантаження для вагона
        public int? kol_packet { get; set; }    //	Кількість пакетів
        public string nom_pereg { get; set; }   //	Номер вагону, з якого був перевантажений вантаж
        public int? vesg { get; set; }  //	Вага вантажу нетто (кг)
    }

    public class PAY_V
    {
        public int? currency { get; set; }  //	Тризначний код валюти платежу
        public DateTime? date { get; set; } //	Дата призначення платежу
        public string kod { get; set; } //	Код платежу 
        public string podkod { get; set; }  //	Підкод платежу 
        public int? summa { get; set; } //	Cума платежу (коп.)
        public string stn { get; set; } //	Код станції призначення платежу
    }

    public class COLLECT_V
    {
        public double? ballast { get; set; } //	Вміст баласту (%)
        public string danger { get; set; }  //	Клас небезпечності вантажу
        public string danger_ak_pr { get; set; }    //	Ознака прикладеної аварійної картки
        public string danger_kod { get; set; }  //	Код небезпеки вантажу
        public string danger_proper_name { get; set; }  //	Належне найменування небезпечного вантажу
        public string danger_signs { get; set; }    //	Знаки небезпеки
        public int? danger_sng { get; set; }    //	Код небезпечного вантажу для транзиту згідно з Дод. 4 ТП СНД
        public string danger_text { get; set; } //	Найменування небезпечного вантажу та інформація про небезпечний вантаж
        public DateTime? date_strah_dog { get; set; }   //	Дата початку дії страхового договору
        public double? density { get; set; }    //	Густина
        public double? density20deg { get; set; }   //	Густина за температури 20°С (г/см³)
        public string kod_etsng { get; set; }   //	Код вантажу по ЄТСНВ
        public int? kol_devices { get; set; }   //	Кількість місць багатооборотних перевізних пристосувань
        public string kod_gng { get; set; } //	Код вантажу по ГНВ (Обов'язкове поле для міжнародних відправок)
        public int? kol_pac { get; set; }   //	Кількість місць упаковки
        public int? kol_packet { get; set; }    //	Кількість пакетів
        public string mark_gr { get; set; } //	Марки вантажу (для збірних відправок)
        public int? metod_gr { get; set; }  //	Код способу визначення маси вантажу (для збірних відправок)
        public string name_etsng { get; set; }  //	Найменування вантажу по ЄТСНВ
        public string name_gng { get; set; }    //	Найменування вантажу по ГНВ (Обов'язкове поле для міжнародних відправок)
        public string name_komp { get; set; }   //	Найменування страхової компанії 
        public int? negab_gr { get; set; }  //	Індекс негабаритності вантажу (для збірних відправок)
        public string nhm_id { get; set; }  //	NHM код вантажу (Обов'язкове поле для ЦІМ та ЦІМ/СМГС)
        public string nhm_name { get; set; }    //	Найменування вантажу NHM на російській мові (Обов'язкове поле для ЦІМ та ЦІМ/СМГС)
        public string nhm_name_de { get; set; } //	Найменування вантажу NHM на другій мові документа (Обов'язкове поле для ЦІМ та ЦІМ/СМГС)
        public string nom_card { get; set; }    //	Номер аварійної картки
        public string nom_oon { get; set; } //	Номер ООН небезпечного вантажу
        public string nom_polis { get; set; }   //	Номер страхового полісу
        public string nomer_gr { get; set; }    //	Номери вантажу (для збірних відправок)
        public string p_danger { get; set; }    //	Підклас небезпечності вантажу
        public string pac { get; set; } //	Код роду упаковки
        public string packing_group { get; set; }   //	Група пакування небезпечного вантажу
        public string pr_packet { get; set; }   //	Ознака перевезення вантажу в пакетах
        public string sing_gr { get; set; } //	Знаки вантажу (для збірних відправок)
        public int? strah_komp { get; set; }    //	Умовний код страхової компанії
        public int? tank_level { get; set; }    //	Висота наливу
        public string temp { get; set; }    //	Температура
        public int? vesg { get; set; }  //	Вага вантажу нетто (кг)
        public double? waterlevel { get; set; } //	Рівень підтоварної води (см)
        public int? weight_place_br_gr { get; set; }    //	Стандартна маса одного місця брутто (кг) (для збірних відправок)
        public int? weight_place_net_gr { get; set; }   //	Стандартна маса одного місця нетто (кг) (для збірних відправок)
        public string zvvt_num { get; set; }    //	Заводський номер засобу вагоно-вимірювальної техніки (для збірних відправок)
    }

    public class TOOLS
    {
        public int? ves_tools { get; set; } //	Вага пристроїв (кг)
    }

    public class ZPU_V
    {
        public string esr_zpu { get; set; } //	Код станції накладання пломби або ЗПП
        public string nom_zpu { get; set; } //	Номер ЗПП
        public string sobst_zpu { get; set; }   //	Ознака власності пломб або ЗПП
        public int? zd_kod { get; set; }    //	Код залізниці накладання пломби
        public string zpu { get; set; }	//	Код виду ЗПП 
    }

    public class Test_UZ
    {
        public Test_UZ()
        {

        }

        #region UZ

        public void UZ_WebApiClientUZWagon()
        {
            WebAPIClientUZ client = new WebAPIClientUZ(service.Null);
            Console.WriteLine("Запрос....");
            //List<string> list2 = client.GetInfoWagon(58647785);
            UZWagonInfo info = client.GetInfoWagonOfNum(58647782);
        }
        /// <summary>
        /// Получить атрибут
        /// </summary>
        /// <param name="node"></param>
        /// <param name="name"></param>
        /// <returns></returns>
        public static T getAttributes<T>(XmlNode node, string name)
        {
            XmlNode attr = node.Attributes.GetNamedItem(name);
            if (attr != null)
            {
                if (typeof(T) == typeof(System.Int32))
                {
                    return (T)(object)Int32.Parse(attr.Value);
                }
                if (typeof(T) == typeof(System.Int32?))
                {
                    return !String.IsNullOrWhiteSpace(attr.Value) ? (T)(object)Int32.Parse(attr.Value) : default(T);
                }
                if (typeof(T) == typeof(System.String))
                {
                    return (T)(object)attr.Value;
                }
                if (typeof(T) == typeof(System.Double))
                {
                    return (T)(object)Double.Parse(attr.Value);
                }
                if (typeof(T) == typeof(System.Double?))
                {
                    return !String.IsNullOrWhiteSpace(attr.Value) ? (T)(object)Double.Parse(attr.Value, new CultureInfo("en")) : default(T);
                }
                if (typeof(T) == typeof(System.DateTime))
                {
                    return (T)(object)DateTime.Parse(attr.Value);
                }
                if (typeof(T) == typeof(System.DateTime?))
                {
                    return !String.IsNullOrWhiteSpace(attr.Value) ? (T)(object)DateTime.Parse(attr.Value) : default(T);
                }
            }
            return default(T);
        }

        public void GetAttributes(XmlNode node, ref OTPR tag)
        {
            if (node.Attributes.Count > 0)
            {
                tag.date_finish = getAttributes<DateTime?>(node, "date_finish");
                tag.date_plan = getAttributes<DateTime?>(node, "date_plan");
                tag.date_strah_dog_recipient = getAttributes<DateTime?>(node, "date_strah_dog_recipient");
                tag.date_vid = getAttributes<DateTime?>(node, "date_vid");
                tag.deliv_note = getAttributes<string>(node, "deliv_note");
                tag.street = getAttributes<string>(node, "street");
                tag.ser_passp = getAttributes<string>(node, "ser_passp");
                tag.strah_komp_recipient = getAttributes<int?>(node, "strah_komp_recipient");
                tag.name_strah_komp_recipient = getAttributes<string>(node, "name_strah_komp_recipient");
                tag.nom_passp = getAttributes<int?>(node, "nom_passp");
                tag.nom_dover = getAttributes<int?>(node, "nom_dover");
                tag.nom_strah_polis_recipient = getAttributes<string>(node, "nom_strah_polis_recipient");
                tag.house = getAttributes<string>(node, "house");
                tag.date_dover = getAttributes<DateTime?>(node, "date_dover");
                tag.city = getAttributes<string>(node, "city");
                tag.apartam = getAttributes<int?>(node, "apartam");
                tag.rab_esr_pr = getAttributes<int?>(node, "rab_esr_pr");
                tag.date_pr = getAttributes<DateTime?>(node, "date_pr");
                tag.date_grpol = getAttributes<DateTime?>(node, "date_grpol");
                tag.sum_pereb = getAttributes<int?>(node, "sum_pereb");
                tag.sum_deliv = getAttributes<int?>(node, "sum_deliv");
                tag.ser_doc = getAttributes<string>(node, "ser_doc");
                tag.pr_distance = getAttributes<string>(node, "pr_distance");
                tag.osum = getAttributes<int?>(node, "osum");
                tag.distance_way = getAttributes<int?>(node, "distance_way");
                tag.doc_lang = getAttributes<string>(node, "doc_lang");
                tag.date_otpr = getAttributes<DateTime?>(node, "date_otpr");
                tag.country_nazn = getAttributes<int?>(node, "country_nazn");
                tag.country_otpr = getAttributes<int?>(node, "country_otpr");
                tag.esr_nakop = getAttributes<string>(node, "esr_nakop");
                tag.esr_rz_marsh_grot = getAttributes<string>(node, "esr_rz_marsh_grot");
                tag.foreign_not_accept = getAttributes<int?>(node, "foreign_not_accept");
                tag.freeze = getAttributes<string>(node, "freeze");
                tag.kod_doc = getAttributes<int?>(node, "kod_doc");
                tag.kod_marsh_grot = getAttributes<string>(node, "kod_marsh_grot");
                tag.loader = getAttributes<string>(node, "loader");
                tag.measure_equip_num = getAttributes<string>(node, "measure_equip_num");
                tag.metod = getAttributes<int?>(node, "metod");
                tag.nom_doc = getAttributes<int?>(node, "nom_doc");
                tag.nom_marsh_grot = getAttributes<int?>(node, "nom_marsh_grot");
                tag.nom_plan = getAttributes<int?>(node, "nom_plan");
                tag.nоm_park = getAttributes<int?>(node, "nоm_park");
                tag.pr_freeze = getAttributes<int?>(node, "pr_freeze");
                tag.pr_locom = getAttributes<string>(node, "pr_locom");
                tag.pr_vohr = getAttributes<string>(node, "pr_vohr");
                tag.priznak = getAttributes<string>(node, "priznak");
                tag.rab_esr = getAttributes<int?>(node, "rab_esr");
                tag.speed = getAttributes<string>(node, "speed");
                tag.srok_end = getAttributes<DateTime?>(node, "srok_end");
                tag.type_pay = getAttributes<string>(node, "type_pay");
                tag.val_gr = getAttributes<int?>(node, "val_gr");
                tag.value = getAttributes<int?>(node, "value");
                tag.vid = getAttributes<string>(node, "vid");
                tag.vid_marsh = getAttributes<int?>(node, "vid_marsh");
                tag.vid_nakaz_pr = getAttributes<int?>(node, "vid_nakaz_pr");
                tag.vid_perev = getAttributes<string>(node, "vid_perev");
                tag.vmd_nom_declar = getAttributes<int?>(node, "vmd_nom_declar");
                tag.vmd_nom_custom = getAttributes<int?>(node, "vmd_nom_custom");
                tag.vmd_year_declar = getAttributes<int?>(node, "vmd_year_declar");
                tag.vmd_date_declar = getAttributes<DateTime?>(node, "vmd_date_declar");
            }
        }
        /// <summary>
        /// Заполнить атрибуты CLIENT
        /// </summary>
        /// <param name="node"></param>
        /// <param name="tag"></param>
        public void GetAttributes(XmlNode node, ref CLIENT tag)
        {
            if (node.Attributes.Count > 0)
            {
                tag.account = getAttributes<string>(node, "account");
                tag.adress = getAttributes<string>(node, "adress");
                tag.bank = getAttributes<string>(node, "bank");
                tag.business_unit_num = getAttributes<string>(node, "business_unit_num");
                tag.carrier_kod = getAttributes<int?>(node, "carrier_kod");
                tag.carrier_name = getAttributes<string>(node, "carrier_name");
                tag.city = getAttributes<string>(node, "city");
                tag.email = getAttributes<string>(node, "email");
                tag.fax = getAttributes<string>(node, "fax");
                tag.kod = getAttributes<string>(node, "kod");
                tag.mfo = getAttributes<string>(node, "mfo");
                tag.name = getAttributes<string>(node, "name");
                tag.nds_pay_code = getAttributes<string>(node, "nds_pay_code");
                tag.okpo = getAttributes<string>(node, "okpo");
                tag.phone = getAttributes<string>(node, "phone");
                tag.representative_pib = getAttributes<string>(node, "representative_pib");
                tag.type = getAttributes<string>(node, "type");
            }
            foreach (XmlNode chield_node in node.ChildNodes)
            {
                if (chield_node.Name == "CLIENT_LOC")
                {
                    CLIENT_LOC client_loc = new CLIENT_LOC();
                    GetAttributes(chield_node, ref client_loc);
                    // Добавим клиентов
                    List<CLIENT_LOC> list = tag.client_loc.ToList();
                    list.Add(client_loc);
                    tag.client_loc = list.ToArray();
                }
            }

        }
        /// <summary>
        /// Класс CLIENT_LOC
        /// </summary>
        /// <param name="node"></param>
        /// <param name="tag"></param>
        public void GetAttributes(XmlNode node, ref CLIENT_LOC tag)
        {
            tag.adress = getAttributes<string>(node, "adress");
            tag.lang = getAttributes<string>(node, "lang");
            tag.name = getAttributes<string>(node, "name");
        }

        public void GetAttributes(XmlNode node, ref PL tag)
        {
            tag.carrier_kod = getAttributes<int?>(node, "carrier_kod");
            tag.carrier_name = getAttributes<string>(node, "carrier_name");
            tag.currency = getAttributes<int?>(node, "currency");
            tag.date_carrier_dog = getAttributes<DateTime?>(node, "date_carrier_dog");
            tag.kod_adm = getAttributes<int?>(node, "kod_adm");
            tag.kod_plat = getAttributes<string>(node, "kod_plat");
            tag.name_plat = getAttributes<string>(node, "name_plat");
            tag.num_carrier_dog = getAttributes<string>(node, "num_carrier_dog");
            tag.podkod_exp = getAttributes<int?>(node, "podkod_exp");
            tag.sector_num = getAttributes<int?>(node, "sector_num");
            tag.type = getAttributes<string>(node, "type");
            foreach (XmlNode chield_node in node.ChildNodes)
            {
                if (chield_node.Name == "PAY")
                {
                    PAY pay = new PAY();
                    GetAttributes(chield_node, ref pay);
                    // Добавим клиентов
                    List<PAY> list = tag.pay.ToList();
                    list.Add(pay);
                    tag.pay = list.ToArray();
                }
                if (chield_node.Name == "PL_LOC")
                {
                    PL_LOC pl_loc = new PL_LOC();
                    GetAttributes(chield_node, ref pl_loc);
                    tag.pl_loc = pl_loc;
                }
            }
        }

        public void GetAttributes(XmlNode node, ref PAY tag)
        {
            tag.currency = getAttributes<int?>(node, "currency");
            tag.date = getAttributes<DateTime?>(node, "date");
            tag.kod = getAttributes<string>(node, "kod");
            tag.nom_doc = getAttributes<int?>(node, "nom_doc");
            tag.podkod = getAttributes<string>(node, "podkod");
            tag.pr_avt = getAttributes<string>(node, "pr_avt");
            tag.ser_doc = getAttributes<string>(node, "ser_doc");
            tag.stn = getAttributes<string>(node, "stn");
            tag.summa = getAttributes<int?>(node, "summa");
        }

        public void GetAttributes(XmlNode node, ref PL_LOC tag)
        {
            tag.adress = getAttributes<string>(node, "adress");
            tag.lang = getAttributes<string>(node, "lang");
            tag.name = getAttributes<string>(node, "name");
        }

        public void GetAttributes(XmlNode node, ref ROUTE tag)
        {
            tag.index = getAttributes<int?>(node, "index");
            tag.stn_from = getAttributes<string>(node, "stn_from");
            tag.name_from = getAttributes<string>(node, "name_from");
            tag.rw_from = getAttributes<int?>(node, "rw_from");
            tag.stn_to = getAttributes<string>(node, "stn_to");
            tag.name_to = getAttributes<string>(node, "name_to");
            tag.rw_to = getAttributes<int?>(node, "rw_to");
            tag.zd_nazn = getAttributes<int?>(node, "zd_nazn");
            tag.zd_otpr = getAttributes<int?>(node, "zd_otpr");
            foreach (XmlNode chield_node in node.ChildNodes)
            {
                if (chield_node.Name == "JOINT")
                {
                    JOINT joint = new JOINT();
                    GetAttributes(chield_node, ref joint);
                    // Добавим клиентов
                    List<JOINT> list = tag.joint.ToList();
                    list.Add(joint);
                    tag.joint = list.ToArray();
                }
                if (chield_node.Name == "PEREADR_INFO")
                {
                    PEREADR_INFO pereadr_info = new PEREADR_INFO();
                    GetAttributes(chield_node, ref pereadr_info);
                    tag.pereadr_info = pereadr_info;
                }
                if (chield_node.Name == "ROUTE_LOC")
                {
                    ROUTE_LOC route_loc = new ROUTE_LOC();
                    GetAttributes(chield_node, ref route_loc);
                    tag.route_loc = route_loc;
                }
            }
        }

        public void GetAttributes(XmlNode node, ref JOINT tag)
        {
            tag.cross_time = getAttributes<DateTime?>(node, "cross_time");
            tag.direction = getAttributes<string>(node, "direction");
            tag.port_name = getAttributes<string>(node, "port_name");
            tag.stn = getAttributes<string>(node, "stn");
            tag.stn_name = getAttributes<string>(node, "stn_name");
            tag.admin = getAttributes<int?>(node, "admin");
            tag.zd_kod = getAttributes<int?>(node, "zd_kod");
            foreach (XmlNode chield_node in node.ChildNodes)
            {
                if (chield_node.Name == "JOINT_LOC")
                {
                    JOINT_LOC joint_loc = new JOINT_LOC();
                    GetAttributes(chield_node, ref joint_loc);
                    tag.joint_loc = joint_loc;
                }
            }
        }

        public void GetAttributes(XmlNode node, ref JOINT_LOC tag)
        {
            tag.stn_name = getAttributes<string>(node, "stn_name");
            tag.lang = getAttributes<string>(node, "lang");
        }

        public void GetAttributes(XmlNode node, ref PEREADR_INFO tag)
        {
            tag.date_nakaz = getAttributes<DateTime?>(node, "date_nakaz");
            tag.date_pereadr = getAttributes<DateTime?>(node, "date_pereadr");
            tag.distance = getAttributes<int?>(node, "distance");
            tag.nakaz = getAttributes<string>(node, "nakaz");
            tag.nom_perv_doc = getAttributes<int?>(node, "nom_perv_doc");
            tag.ser_perv_doc = getAttributes<string>(node, "ser_perv_doc");
            tag.type_pay_old = getAttributes<string>(node, "type_pay_old");
        }

        public void GetAttributes(XmlNode node, ref ROUTE_LOC tag)
        {
            tag.lang = getAttributes<string>(node, "lang");
            tag.name_from = getAttributes<string>(node, "name_from");
            tag.name_to = getAttributes<string>(node, "name_to");
        }

        public void GetAttributes(XmlNode node, ref SHTEMPEL tag)
        {
            tag.column_num = getAttributes<string>(node, "column_num");
            tag.info_sht = getAttributes<string>(node, "info_sht");
            tag.nom_sht = getAttributes<int?>(node, "nom_sht");
        }

        public void GetAttributes(XmlNode node, ref SPEC_COND tag)
        {
            tag.code = getAttributes<int?>(node, "code");
            tag.name_metal = getAttributes<string>(node, "name_metal");
            tag.name_val = getAttributes<string>(node, "name_val");
            tag.val = getAttributes<string>(node, "val");
        }

        public void GetAttributes(XmlNode node, ref TEXT tag)
        {
            tag.branch = getAttributes<string>(node, "branch");
            tag.calc_reason = getAttributes<string>(node, "calc_reason");
            tag.carrier_from = getAttributes<int?>(node, "carrier_from");
            tag.create_place = getAttributes<string>(node, "create_place");
            tag.create_place_de = getAttributes<string>(node, "create_place_de");
            tag.date_permit = getAttributes<DateTime?>(node, "date_permit");
            tag.doc_grot = getAttributes<string>(node, "doc_grot");
            tag.rwc_doc_name = getAttributes<string>(node, "rwc_doc_name");
            tag.rw_note = getAttributes<string>(node, "rw_note");
            tag.rw_mark = getAttributes<string>(node, "rw_mark");
            tag.name_tov = getAttributes<string>(node, "name_tov");
            tag.loader_fio = getAttributes<string>(node, "loader_fio");
            tag.loader_position = getAttributes<string>(node, "loader_position");
            tag.marks = getAttributes<string>(node, "marks");
            tag.marks_gr = getAttributes<string>(node, "marks_gr");
            tag.mount_chapter = getAttributes<string>(node, "mount_chapter");
            tag.mount_para = getAttributes<string>(node, "mount_para");
            tag.name_gr = getAttributes<string>(node, "name_gr");
            tag.nom_dog = getAttributes<string>(node, "nom_dog");
            tag.nom_gr = getAttributes<string>(node, "nom_gr");
            tag.nom_permit = getAttributes<string>(node, "nom_permit");
            tag.outside_payer_code = getAttributes<int?>(node, "outside_payer_code");
            tag.sing = getAttributes<string>(node, "sing");
            tag.stn_accum = getAttributes<string>(node, "stn_accum");
            tag.stn_name_accum = getAttributes<string>(node, "stn_name_accum");
            tag.trans_plan = getAttributes<string>(node, "trans_plan");
            tag.zayava = getAttributes<string>(node, "zayava");
        }

        public void GetAttributes(XmlNode node, ref VAGON tag)
        {
            tag.calc_weight = getAttributes<int?>(node, "calc_weight");
            tag.etsng_old = getAttributes<string>(node, "etsng_old");
            tag.gng_old = getAttributes<string>(node, "gng_old");
            tag.gruzp = getAttributes<double?>(node, "gruzp");
            tag.is_removed = getAttributes<string>(node, "is_removed");
            tag.ostat_davl = getAttributes<double?>(node, "ostat_davl");
            tag.kod_adm = getAttributes<int?>(node, "kod_adm");
            tag.kod_firm_owner = getAttributes<string>(node, "kod_firm_owner");
            tag.kol_conductor = getAttributes<int?>(node, "kol_conductor");
            tag.kol_os = getAttributes<int?>(node, "kol_os");
            tag.measure_equip_num = getAttributes<string>(node, "measure_equip_num");
            tag.name_firm_owner = getAttributes<string>(node, "name_firm_owner");
            tag.negab_do = getAttributes<int?>(node, "negab_do");
            tag.negab_rs = getAttributes<int?>(node, "negab_rs");
            tag.negab_v = getAttributes<int?>(node, "negab_v");
            tag.nom_ref = getAttributes<int?>(node, "nom_ref");
            tag.nomer = getAttributes<string>(node, "nomer");
            tag.pour_off_date = getAttributes<DateTime?>(node, "pour_off_date");
            tag.pr_sobst = getAttributes<int?>(node, "pr_sobst");
            tag.pr_zam = getAttributes<int?>(node, "pr_zam");
            tag.promoted_by = getAttributes<string>(node, "promoted_by");
            tag.remove_weight = getAttributes<int?>(node, "remove_weight");
            tag.rod_vag = getAttributes<int?>(node, "rod_vag");
            tag.roller_weight = getAttributes<int?>(node, "roller_weight");
            tag.tank_state = getAttributes<int?>(node, "tank_state");
            tag.use = getAttributes<int?>(node, "use");
            tag.usl_tip = getAttributes<string>(node, "usl_tip");
            tag.u_tara = getAttributes<int?>(node, "u_tara");
            tag.ves_tary_arc = getAttributes<int?>(node, "ves_tary_arc");
            tag.zd_kod = getAttributes<int?>(node, "zd_kod");
        }

        //---------------------------------------------------------------------

        public void GetTagClient(XmlNode node, ref OTPR otpr)
        {
            CLIENT tag = new CLIENT();
            GetAttributes(node, ref tag);
            // Добавим клиентов
            List<CLIENT> list = otpr.client.ToList();
            list.Add(tag);
            otpr.client = list.ToArray();
        }

        public void GetTagPL(XmlNode node, ref OTPR otpr)
        {
            PL tag = new PL();
            GetAttributes(node, ref tag);
            // Добавим клиентов
            List<PL> list = otpr.pl.ToList();
            list.Add(tag);
            otpr.pl = list.ToArray();
        }

        public void GetTagROUTE(XmlNode node, ref OTPR otpr)
        {
            ROUTE tag = new ROUTE();
            GetAttributes(node, ref tag);
            // Добавим клиентов
            List<ROUTE> list = otpr.route.ToList();
            list.Add(tag);
            otpr.route = list.ToArray();
        }

        public void GetTagSHTEMPEL(XmlNode node, ref OTPR otpr)
        {
            SHTEMPEL tag = new SHTEMPEL();
            GetAttributes(node, ref tag);
            // Добавим клиентов
            List<SHTEMPEL> list = otpr.shtempel.ToList();
            list.Add(tag);
            otpr.shtempel = list.ToArray();
        }

        public void GetTagSPEC_COND(XmlNode node, ref OTPR otpr)
        {
            SPEC_COND tag = new SPEC_COND();
            GetAttributes(node, ref tag);
            // Добавим клиентов
            List<SPEC_COND> list = otpr.spec_cond.ToList();
            list.Add(tag);
            otpr.spec_cond = list.ToArray();
        }

        public void GetTagTEXT(XmlNode node, ref OTPR otpr)
        {
            TEXT tag = new TEXT();
            GetAttributes(node, ref tag);
            otpr.text = tag;
        }

        public void GetTagVAGON(XmlNode node, ref OTPR otpr)
        {
            VAGON tag = new VAGON();
            GetAttributes(node, ref tag);
            // Добавим клиентов
            List<VAGON> list = otpr.vagon.ToList();
            list.Add(tag);
            otpr.vagon = list.ToArray();
        }

        public void UZ_XML_DOC(XmlElement xRoot)
        {
            foreach (XmlNode xnode in xRoot)
            {
                //foreach (XmlNode node_doc in xnode.ChildNodes)
                //{
                // если узел - document-data
                if (xnode.Name == "document-data")
                {
                    foreach (XmlNode child_node_doc in xnode.ChildNodes)
                    {
                        // если узел - document-data
                        if (child_node_doc.Name == "uz-rwc-doc")
                        {
                            UZ_XML_DOC((XmlElement)child_node_doc);
                        }
                        // если узел - document-data
                        if (child_node_doc.Name == "OTPR")
                        {
                            OTPR otpr = new OTPR();
                            // атрибуты
                            GetAttributes(child_node_doc, ref otpr);

                            foreach (XmlNode otpr_node in child_node_doc.ChildNodes)
                            {
                                switch (otpr_node.Name)
                                {
                                    // ACTS
                                    // CARRIER
                                    // CIM_INFO                                     
                                    case "CLIENT": { GetTagClient(otpr_node, ref otpr); break; }
                                    // COM_COND
                                    // CONT
                                    // FRONTIER_MARK
                                    // OTPRDP
                                    // PAC
                                    // PASS_MARK
                                    case "PL": { GetTagPL(otpr_node, ref otpr); break; }
                                    // PROLONGATION
                                    case "ROUTE": { GetTagROUTE(otpr_node, ref otpr); break; }
                                    // RW_STAT
                                    // REFUSE_EPD
                                    // REISSUE_INFO
                                    // SCHEMA
                                    // SENDER_DOC
                                    // SEND_STAT
                                    case "SHTEMPEL": { GetTagSHTEMPEL(otpr_node, ref otpr); break; }
                                    case "SPEC_COND": { GetTagSPEC_COND(otpr_node, ref otpr); break; }
                                    //TAKS
                                    case "TEXT": { GetTagTEXT(otpr_node, ref otpr); break; }
                                    case "VAGON": { GetTagVAGON(otpr_node, ref otpr); break; }
                                }
                            }
                        }
                    }
                }
                // если узел - changes
                if (xnode.Name == "signature")
                {
                    foreach (XmlNode childnode in xnode.ChildNodes)
                    {

                    }
                }
                //}
            }
        }

        public void UZ_XML()
        {
            XmlDocument xDoc = new XmlDocument();
            xDoc.Load("test1.xml");
            // получим корневой элемент
            XmlElement xRoot = xDoc.DocumentElement;
            string d = xRoot.Name; // uz-rwc-doc
            UZ_XML_DOC(xRoot);
            // обход всех узлов в корневом элементе
            foreach (XmlNode xnode in xRoot)
            {
                // если узел - company
                if (xnode.Name == "company")
                {
                    Console.WriteLine("Компания: {childnode.InnerText}");
                }

                //foreach (XmlNode childnode in xnode.ChildNodes)
                //{
                //    // если узел - company
                //    if (childnode.Name == "company")
                //    {
                //        Console.WriteLine("Компания: {childnode.InnerText}");
                //    }
                //    // если узел age
                //    if (childnode.Name == "age")
                //    {
                //        Console.WriteLine("Возраст: {childnode.InnerText}");
                //    }
                //}

                //uz-rwc-doc
                //document-data
                //uz-rwc-doc
                //document-data
                //<OTPR 
                //signature
                //changes
                //signature
                //?changes


                //// получаем атрибут name
                //if (xnode.Attributes.Count > 0)
                //{
                //    XmlNode attr = xnode.Attributes.GetNamedItem("name");
                //    if (attr != null)
                //        Console.WriteLine(attr.Value);
                //}
                //// обходим все дочерние узлы элемента user
                //foreach (XmlNode childnode in xnode.ChildNodes)
                //{
                //    // если узел - company
                //    if (childnode.Name == "company")
                //    {
                //        Console.WriteLine("Компания: {childnode.InnerText}");
                //    }
                //    // если узел age
                //    if (childnode.Name == "age")
                //    {
                //        Console.WriteLine("Возраст: {childnode.InnerText}");
                //    }
                //}
                //Console.WriteLine();
            }
            Console.Read();

        }

        public class Serializer
        {
            public T Deserialize<T>(string input) where T : class
            {
                try
                {
                    System.Xml.Serialization.XmlSerializer ser = new System.Xml.Serialization.XmlSerializer(typeof(T));

                    using (StringReader sr = new StringReader(input))
                    {
                        return (T)ser.Deserialize(sr);
                    }
                }
                catch (Exception e)
                {
                    return null;
                }


            }

            public string Serialize<T>(T ObjectToSerialize)
            {
                XmlSerializer xmlSerializer = new XmlSerializer(ObjectToSerialize.GetType());

                using (StringWriter textWriter = new StringWriter())
                {
                    xmlSerializer.Serialize(textWriter, ObjectToSerialize);
                    return textWriter.ToString();
                }
            }
        }

        public void UZ_XML1()
        {
            XmlDocument xDoc = new XmlDocument();
            xDoc.Load("test2.xml");
            // получим корневой элемент
            Serializer ser = new Serializer();
            string d = File.ReadAllText("test1.xml");

            documentdatainfo f = new documentdatainfo();

            //f.ItemsElementName.SetValue(ItemsChoiceType.OTPR);

            //string d = xDoc.ToString();
            documentdatainfo customer = ser.Deserialize<documentdatainfo>(d);
            //xmlOutputData = ser.Serialize<consignment5>(customer);
        }

        #endregion
    }
}
