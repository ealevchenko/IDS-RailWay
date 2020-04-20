using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml;
using IDSLogs.Enum;
using IDSLogs;

namespace UZ
{

    #region КЛАССЫ СТРУКТУРЫ OTPR

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
        public ACTS[] acts = new ACTS[] { }; // (~)
        public CARRIER[] carrier = new CARRIER[] { }; // (~)
        public CIM_INFO cim_info { get; set; } // (0..1)
        public CLIENT[] client = new CLIENT[] { }; // (2)
        public COM_COND[] com_cond = new COM_COND[] { }; // (~)
        public CONT[] cont = new CONT[] { }; // (~)
        public FRONTIER_MARK[] frontier_mark = new FRONTIER_MARK[] { }; // (~)
        public OTPRDP otprdp { get; set; } // (0..1)
        public PAC pac { get; set; } // (0..1)
        public PASS_MARK[] pass_mark = new PASS_MARK[] { }; // (~)
        public PL[] pl = new PL[] { }; // (~)
        public PROLONGATION[] prolongation = new PROLONGATION[] { }; // (~)
        public ROUTE[] route = new ROUTE[] { };// (~)
        public RW_STAT[] rw_stat = new RW_STAT[] { };// (~)
        public REFUSE_EPD refuse_epd { get; set; } // (0..1)
        public REISSUE_INFO reissue_info { get; set; } // (0..1)
        public SCHEMA[] shema = new SCHEMA[] { };// (0..10)
        public SENDER_DOC[] sender_doc = new SENDER_DOC[] { };// (~)
        public SEND_STAT[] send_stat = new SEND_STAT[] { };// (~)
        public SHTEMPEL[] shtempel = new SHTEMPEL[] { }; // (~)
        public SPEC_COND[] spec_cond = new SPEC_COND[] { }; // (~)
        public TAKS taks { get; set; } // (0..1) 
        public TEXT text { get; set; } // (0..1)
        public VAGON[] vagon = new VAGON[] { }; // (0..120)
    }

    public class ACTS
    {
        public int? carrier_kod { get; set; }	//	Код перевізника
        public string carrier_name { get; set; }	//	Скорочене найменування перевізника
        public DateTime? date_akt { get; set; }	//	Дата складання акту
        public DateTime? date_dved { get; set; }	//	Дата укладання досильної дорожньої відомості
        public string esr_akt { get; set; }	//	ЄСР станції складання акту 
        public string stn_name_akt { get; set; }	//	Найменування станції складання акту
        public string nom_akt { get; set; }	//	Номер акту 
        public int? nom_dved { get; set; }	//	Номер досильної дорожньої відомості
        public DateTime? oper_date { get; set; }	//	Дата внесення даних по акту у перевізний документ
        public string prichina_akt { get; set; }	//	Причина 
        public string responsible_person { get; set; }	//	Ім'я особи, відповідальної за внесення данних по акту у перевізний документ
        public string ser_dved { get; set; }	//	Серія досильної дорожньої відомості
        public string type { get; set; }	//	Тип акту
        public string vagon_nom { get; set; }	//	Номер вагону 
        public int? zd_kod { get; set; }	//	Код залізниці перевантаження
    }

    public class CARRIER
    {
        public string address { get; set; }	//	Поштова адреса перевізника
        public int? esr_in { get; set; }	//	Код вхідної станції ділянки 
        public string esr_name_in { get; set; }	//	Найменування  вхідної станції ділянки
        public string esr_name_out { get; set; }	//	Найменування  вихідної станції ділянки
        public int? esr_out { get; set; }	//	Код вихідної станції ділянки 
        public int? kod { get; set; }	//	Код перевізника на ділянці маршруту
        public string name { get; set; }	//	Скорочене найменування перевізника на ділянці маршруту
        public int? sector_num { get; set; }	//	Номер ділянки
        public int? status { get; set; }	//	Статус перевізника
        public int? zd_kod_in { get; set; }	//	Код залізниці вхідної станції ділянки 
        public int? zd_kod_out { get; set; }	//	Код залізниці вихідної станції ділянки 
    }

    public class CIM_INFO
    {
        public string arc_code { get; set; }	//	Податковий адміністративний код ARC
        public string arr_agent_code_1 { get; set; }	//	Код №1 перевізника при прибутті
        public string arr_agent_code_2 { get; set; }	//	Код №2 перевізника при прибутті
        public string arr_agent_code_3 { get; set; }	//	Код №3 перевізника при прибутті
        public string arr_agent_code_4 { get; set; }	//	Код №4 перевізника при прибутті
        public string custom_stn_code { get; set; }	//	Код станції проходження митного контролю
        public string custom_stn_name { get; set; }	//	Найменування станції проходження митного контролю
        public string custom_stn_name_de { get; set; }	//	Найменування станції проходження митного контролю німецькою мовою (для ЦІМ та ЦІМ/СМГС бланка)
        public int? cuv { get; set; }	//	Позначка ЦУВ
        public string dep_agent_code_1 { get; set; }	//	Код №1 перевізника при відправленні
        public string dep_agent_code_2 { get; set; }	//	Код №2 перевізника при відправленні
        public string dep_agent_code_3 { get; set; }	//	Код №3 перевізника при відправленні
        public string dep_agent_code_4 { get; set; }	//	Код №4 перевізника при відправленні
        public int? export_mark { get; set; }	//	Позначка EXPORT: 0 або Null – ознака відсутня 1 – «EXPORT»
        public int? extraordinarily { get; set; }	//	Надзвичайне відправлення
        public double? fr_fracht_max { get; set; }	//	Франко вартість перевезення "до"
        public double? fr_fracht_sum { get; set; }	//	Франко вартість перевезення "від"
        public string incoterms_code { get; set; }	//	Код послуги
        public string incoterms_station { get; set; }	//	Станція надання послуги
        public int? interest_currency { get; set; }	//	Валюта зацікавленості в постачанні
        public double? interest_value { get; set; }	//	Зацікавленість у постачанні
        public string mrn_code { get; set; }	//	Ідентифікаційний митний номер
        public int? mrn_condition { get; set; }	//	Умови подання декларації: 1 – «E MRN» 2 – «T MRN» 3 – «TS MRN» 4 – «EXS MRN» 5 – «ENS MRN»
        public int? nonexpert_system { get; set; }	//	Спрощена процедура для залізничних відправлень
        public string others_agents { get; set; }	//	Інші перевізники
        public double? payment { get; set; }	//	Накладений платіж
        public DateTime? payment_bill_date { get; set; }	//	Дата транспортної накладної для накладених платежів
        public string payment_bill_num { get; set; }	//	Транспортна накладна для накладених платежів
        public int? payment_currency { get; set; }	//	Валюта накладеного платежу
        public DateTime? place_date_from { get; set; }	//	Дата передачі (дата і час приймання вантажу до перевезення)
        public string place_from { get; set; }	//	Код місця передачі (код станції приймання вантажу)
        public string place_name_from { get; set; }	//	Місце передачі (назва станції приймання вантажу)
        public string place_name_from_de { get; set; }	//	Місце передачі (назва станції приймання вантажу) німецькою мовою (для ЦІМ та ЦІМ/СМГС бланка)
        public string place_name_to { get; set; }	//	Місце доставки
        public int? place_rw_from { get; set; }	//	Залізниця місця передачі (код залізничної адміністрації станції приймання вантажу)
        public int? place_rw_smgs_from { get; set; }	//	Залізниця СМГС місця передачі
        public string place_to { get; set; }	//	Код місця доставки
        public string place_transhipment_name { get; set; }	//	Назва станції місця перевідправлення
        public string place_transhipment_name_de { get; set; }	//	Назва станції місця перевідправлення німецькою мовою (для ЦІМ та ЦІМ/СМГС бланка)
        public int? place_transhipment_rw { get; set; }	//	Місце перевідправлення (код залізничної адміністрації)
        public string place_transhipment_stn { get; set; }	//	Місце перевідправлення (ЄМР або ЦІМ код станції)
        public string primary_agent { get; set; }	//	Договірний перевізник
        public string responsible_person { get; set; }	//	Код основної відповідальної особи
        public string route_info { get; set; }	//	Маршрут проходження
        public string sender_note { get; set; }	//	Відмітки для одержувача
        public string weight_name_de { get; set; }	//	Вага вантажу прописом на другій мові бланка перевізного документа
    }

    #region CLIENT
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
    #endregion

    public class COM_COND
    {
        public int? code { get; set; }	//	Код комерційної умови
        public string param { get; set; }	//	Додаткова інформація до комерційної умови
        public string param_de { get; set; }	//	Додаткова інформація до комерційної умови німецькою мовою (для ЦІМ та ЦІМ/СМГС бланка)
    }

    #region CONT
    public class CONT
    {
        public int? cim_size_type { get; set; }	//	Код типорозміру по UNІ
        public int? gruzp { get; set; }	//	Маса брутто за трафаретом (т)
        public string info_cont { get; set; }	//	Інші відомості про контейнер
        public int? kod_adm { get; set; }	//	Код власника контейнеру 
        public string kod_tiporazmer { get; set; }	//	Типорозмір контейнеру
        public string nom_cont { get; set; }	//	Номер контейнеру
        public int? pr_sobst { get; set; }	//	Ознака власності контейнеру
        public int? prizn { get; set; }	//	Тип(ознака) контейнеру 
        public string tiporazmer { get; set; }	//	Категорія контейнеру
        public int? ves_tary_arc { get; set; }	//	Маса тари контейнеру (кг)
        public int? nom_vag { get; set; }	//	Номер вагону, у якому перевозиться контейнер (заповнюється при груповому контейнерному перевезенні)
        public PAY_K[] pay_k = new PAY_K[] { }; // (1..~)
        public COLLECT_K collect_k { get; set; } // (1)
        public ZPU_K[] zpu_k = new ZPU_K[] { }; // (0..60)
    }

    public class PAY_K
    {
        public int? currency { get; set; }	//	Тризначний код валюти платежу
        public DateTime? date { get; set; }	//	Дата призначення платежу
        public string kod { get; set; }	//	Код платежу 
        public string podkod { get; set; }	//	Підкод платежу 
        public int? summa { get; set; }	//	Cума платежу (коп.)
        public string stn { get; set; }	//	Код станції призначення платежу
    }

    public class COLLECT_K
    {
        public string danger { get; set; }	//	Клас небезпечності вантажу
        //public string danger_ak_pr { get; set; }	//	Ознака прикладеної аварійної картки
        public string danger_kod { get; set; }	//	Код небезпеки вантажу
        public string danger_proper_name { get; set; }	//	Належне найменування небезпечного вантажу
        public string danger_signs { get; set; }	//	Знаки небезпеки
        public int? danger_sng { get; set; }	//	Код небезпечного вантажу для транзиту згідно з Дод. 4 ТП СНД
        public string danger_text { get; set; }	//	Найменування небезпечного вантажу та інформація про небезпечний вантаж
        public DateTime? date_strah_dog { get; set; }	//	Дата початку дії страхового договору
        public string kod_etsng { get; set; }	//	Код вантажу по ЄТСНВ
        public string kod_gng { get; set; }	//	Код вантажу по ГНВ (Обов'язкове поле для міжнародних відправок)
        public int? kol_devices { get; set; }	//	Кількість місць багатооборотних перевізних пристосувань
        public int? kol_pac { get; set; }	//	Кількість місць упаковки
        public int? kol_packet { get; set; }	//	Кількість пакетів
        public string name_etsng { get; set; }	//	Найменування вантажу по ЄТСНВ
        public string name_gng { get; set; }	//	Найменування вантажу по ГНВ (Обов'язкове поле для міжнародних відправок)
        public string name_komp { get; set; }	//	Найменування страхової компанії 
        public string nhm_id { get; set; }	//	NHM код вантажу (Обов'язкове поле для ЦІМ та ЦІМ/СМГС)
        public string nhm_name { get; set; }	//	Найменування вантажу NHM на російській мові (Обов'язкове поле для ЦІМ та ЦІМ/СМГС)
        public string nhm_name_de { get; set; }	//	Найменування вантажу NH на другій мові документа (Обов'язкове поле для ЦІМ та ЦІМ/СМГС)
        public string nom_card { get; set; }	//	Номер аварійної картки
        public string nom_oon { get; set; }	//	Номер ООН небезпечного вантажу
        public string nom_polis { get; set; }	//	Номер страхового полісу
        public string p_danger { get; set; }	//	Підклас небезпечності вантажу
        public string pac { get; set; }	//	Код роду упаковки
        public string packing_group { get; set; }	//	Група пакування небезпечного вантажу
        public int? danger_ak_pr { get; set; }	//	Ознака прикладеної аварійної картки
        public int? pr_packet { get; set; }	//	Ознака перевезення вантажу в пакетах
        public int? strah_komp { get; set; }	//	Умовний код страхової компанії
        public int? vesg { get; set; }	//	Вага вантажу нетто (кг)
    }

    public class ZPU_K
    {
        public string esr_zpu { get; set; }	//	Код станції накладання пломби або ЗПП
        public string nom_zpu { get; set; }	//	Номер ЗПП
        public int? sobst_zpu { get; set; }	//	Ознака власності пломб або ЗПП
        public int? zd_kod { get; set; }	//	Код залізниці накладання пломби
        public int? zpu { get; set; }	//	Код виду ЗПП 
    }

    #endregion

    public class FRONTIER_MARK
    {
        public int? carrier_kod { get; set; }	//	Код перевізника
        public string carrier_name { get; set; }	//	Скорочене найменування перевізника
        public DateTime? cross_date { get; set; }	//	Дата проходження прикордонної станції
        public int? direction { get; set; }	//	Напрямок
        public int? esr { get; set; }	//	Код прикордонної станції
        public string esr_name { get; set; }	//	Найменування прикордонної станції
        public int? zd_kod { get; set; }	//	Код залізниці
    }

    #region  OTPRDP

    public class OTPRDP
    {
        public int? admin_otpr { get; set; }	//	Адміністрація станції відправлення досилання
        public int? nom_osn_doc { get; set; }	//	Номер основного перевізного документу
        public string ser_osn_doc { get; set; }	//	Серія основного перевізного документу
        public string stn_name_otpr { get; set; }	//	Найменування станції відправлення досилання
        public string stn_otpr { get; set; }	//	Код станції відправлення досилання
        public int? zd_otpr { get; set; }	//	Код залізниці відправлення
        public int? zd_nazn { get; set; }	//	Код залізниці призначення
        public JOINT[] joint = new JOINT[] { }; // {0..100}
        public OTPRDP_LOC otprdp_loc { get; set; } // {0..1}
    }

    public class OTPRDP_LOC
    {
        public string lang { get; set; }	//	Двозначний код другої мови перевізного документа по стандарту ІSO 639.1 (для ЦІМ та ЦІМ/СМГС бланка)
        public string stn_name_otpr { get; set; }	//	Найменування станції відправлення досилання на другій мові перевізного документа (для ЦІМ та ЦІМ/СМГС бланка)
    }

    #endregion

    public class PAC
    {
        public int? kol_pac { get; set; }	//	Кількість місць упаковки
        public int? weight_place_br { get; set; }	//	Стандартна маса одного місця брутто (кг)
        public int? weight_place_net { get; set; }	//	Стандартна маса одного місця нетто (кг)
    }

    public class PASS_MARK
    {
        public int? carrier_kod { get; set; }	//	Код перевізника
        public string carrier_name { get; set; }	//	Скорочене найменування перевізника
        public int? esr { get; set; }	//	Код станції передачі вантажу
        public string esr_name { get; set; }	//	Найменування станції передачі вантажу
        public DateTime? pass_date { get; set; }	//	Дата передачі вантажу
        public int? zd_kod { get; set; }	//	Код залізниці
    }

    #region PL
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
    #endregion

    public class PROLONGATION
    {
        public int? carrier_kod { get; set; }	//	Код перевізника
        public string carrier_name { get; set; }	//	Скорочене найменування перевізника
        public DateTime? date_end_delay { get; set; }	//	Дата та час закінчення затримки
        public DateTime? date_start_delay { get; set; }	//	Дата та час початку затримки
        public int? esr { get; set; }	//	Код станції затримки
        public string esr_name { get; set; }	//	Найменування станції затримки
        public int? reason { get; set; }	//	Код причини затримки
        public int? type { get; set; }	//	Ознака відповідності коду причини подовження терміну доставки до договору перевезення ЦІМ або СМГС
        public string user_reason_name { get; set; }	//	Текст причини затримки для коду причини затримки 10 (інші причини)
        public int? zd_kod { get; set; }	//	Код залізниці затримки
    }

    #region ROUTE
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
    #endregion

    public class RW_STAT
    {
        public int? code { get; set; }	//	Код заяви перевізника
        public string param { get; set; }	//	Додаткова інформація до заяви перевізника
        public string param_de { get; set; }	//	Додаткова інформація до заяви перевізника німецькою мовою (для ЦІМ та ЦІМ/СМГС бланка)
    }

    public class REFUSE_EPD
    {
        public DateTime? act_date { get; set; }	//	Дата акту загальної форми
        public string act_nom { get; set; }	//	Номер акту загальної форми
        public string esr { get; set; }	//	ЄМР станції переходу до паперового документу
        public string info { get; set; }	//	Обґрунтування переходу на паперовий перевізний документ
        public string pib { get; set; }	//	ПІБ відповідальної особи, що прийняла рішення про перехід на паперовий перевізний документ
        public string rang { get; set; }	//	Посада відповідальної особи, що прийняла рішення про перехід на паперовий перевізний документ
    }

    public class REISSUE_INFO
    {
        public DateTime? date_otpr { get; set; }	//	Дата прийому до перевезення поперед-нього документа, на основі якого виконано переоформлення с транспортного права ЦІМ на СМГС або навпаки.
        public int? doc_nom { get; set; }	//	Номер попереднього перевізного документа, на основі якого виконано переоформ-лення перевізного документа.
        public string doc_seria { get; set; }	//	Серія попереднього перевізного доку-мента, на основі якого виконано переоформ-лення перевізного документа.
    }

    public class SCHEMA
    {
        public double? carry_sch { get; set; }	//	Схема таксування по відправленню
        public int? pr_sch { get; set; }	//	Ознака виставлення схеми таксування
    }

    public class SENDER_DOC
    {
        public int? id { get; set; }	//	Ідентифікатор документа у базі АТ «Укрзалізниця»;
        public string description { get; set; }	//	Опис документа
        public DateTime? doc_date { get; set; }	//	Дата документу номер документу
        public string doc_type { get; set; }	//	Код типу супровідного документа
        public string doc_type_name { get; set; }	//	Найменування типу супровідного документу
        public int? kod_zd_use { get; set; }	//	Код залізниці вилучення документа
        public int? kol { get; set; }	//	Кількість екземплярів
    }

    public class SEND_STAT
    {
        public int? code { get; set; }	//	Код заяви відправника
        public string param { get; set; }	//	Додаткова інформація
        public string param_de { get; set; }	//	Додаткова інформація німецькою мовою (для ЦІМ та ЦІМ/СМГС бланка)
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

    public class TAKS
    {
        public int? coeff_mode { get; set; }	//	Ознака введення значення коефіцієнта
        public int? coeff_type { get; set; }	//	Вид коефіцієнта 
        public double? coeff_value { get; set; }	//	Значення коефіцієнта
        public int? iskl_mode { get; set; }	//	Ознака введення виняткового тарифу 
        public int? iskl_tar { get; set; }	//	Винятковий тариф
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

    #region VAGON
    public class VAGON
    {
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
        public string name_firm_operator { get; set; }  //	Найменування компанії — оператора вагона
        public string name_firm_renter { get; set; }    //	Найменування компанії — renter вагона
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
        public PEREGR_V peregr_v { get; set; } // {0..1}
        public PAY_V[] pay_v = new PAY_V[] { }; // {~}
        public COLLECT_V[] collect_v = new COLLECT_V[] { }; // {0..99}
        public TOOLS[] tools = new TOOLS[] { }; // {~}
        public ZPU_V[] zpu_v = new ZPU_V[] { }; // {0..60}
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
    #endregion

    #endregion

    public class UZ_Convert
    {

        private eventID eventID = eventID.UZ_Convert;
        protected service servece_owner = service.Null;

        public UZ_Convert()
        {

        }

        public UZ_Convert(service servece_owner)
        {
            this.servece_owner = servece_owner;
        }

        #region ПОЛУЧЕНИЕ OTPR
        #region ЗАПОЛНИТЬ АТРИБУТЫ
        /// <summary>
        /// Получить атрибут
        /// </summary>
        /// <param name="node"></param>
        /// <param name="name"></param>
        /// <returns></returns>
        public static T getAttributes<T>(XmlNode node, string name)
        {
            try
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
                        return (T)(object)DateTime.Parse(attr.Value, CultureInfo.CreateSpecificCulture("ru-RU"));
                    }
                    if (typeof(T) == typeof(System.DateTime?))
                    {
                        return !String.IsNullOrWhiteSpace(attr.Value) ? (T)(object)DateTime.Parse(attr.Value, CultureInfo.CreateSpecificCulture("ru-RU")) : default(T);
                    }
                }
                return default(T);
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("getAttributes(node={0}, name={1})", node, name));
                return default(T);
            }
        }
        /// <summary>
        /// Заполнить атрибуты OTPR
        /// </summary>
        /// <param name="node"></param>
        /// <param name="tag"></param>
        private void GetAttributes(XmlNode node, ref OTPR tag)
        {
            try
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
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetAttributes(node={0}, tag={1})", node, tag), this.servece_owner, this.eventID);
            }
        }
        /// <summary>
        /// Заполнить атрибуты ACTS
        /// </summary>
        /// <param name="node"></param>
        /// <param name="tag"></param>
        private void GetAttributes(XmlNode node, ref ACTS tag)
        {
            if (node.Attributes.Count > 0)
            {
                tag.carrier_kod = getAttributes<int?>(node, "carrier_kod");
                tag.carrier_name = getAttributes<string>(node, "carrier_name");
                tag.date_akt = getAttributes<DateTime?>(node, "date_akt");
                tag.date_dved = getAttributes<DateTime?>(node, "date_dved");
                tag.esr_akt = getAttributes<string>(node, "esr_akt");
                tag.stn_name_akt = getAttributes<string>(node, "stn_name_akt");
                tag.nom_akt = getAttributes<string>(node, "nom_akt");
                tag.nom_dved = getAttributes<int?>(node, "nom_dved");
                tag.oper_date = getAttributes<DateTime?>(node, "oper_date");
                tag.prichina_akt = getAttributes<string>(node, "prichina_akt");
                tag.responsible_person = getAttributes<string>(node, "responsible_person");
                tag.ser_dved = getAttributes<string>(node, "ser_dved");
                tag.type = getAttributes<string>(node, "type");
                tag.vagon_nom = getAttributes<string>(node, "vagon_nom");
                tag.zd_kod = getAttributes<int?>(node, "zd_kod");
            }
        }
        /// <summary>
        /// Заполнить атрибуты CARRIER
        /// </summary>
        /// <param name="node"></param>
        /// <param name="tag"></param>
        private void GetAttributes(XmlNode node, ref CARRIER tag)
        {
            if (node.Attributes.Count > 0)
            {
                tag.address = getAttributes<string>(node, "address");
                tag.esr_in = getAttributes<int?>(node, "esr_in");
                tag.esr_name_in = getAttributes<string>(node, "esr_name_in");
                tag.esr_name_out = getAttributes<string>(node, "esr_name_out");
                tag.esr_out = getAttributes<int?>(node, "esr_out");
                tag.kod = getAttributes<int?>(node, "kod");
                tag.name = getAttributes<string>(node, "name");
                tag.sector_num = getAttributes<int?>(node, "sector_num");
                tag.status = getAttributes<int?>(node, "status");
                tag.zd_kod_in = getAttributes<int?>(node, "zd_kod_in");
                tag.zd_kod_out = getAttributes<int?>(node, "zd_kod_out");
            }
        }
        /// <summary>
        /// Заполнить атрибуты CIM_INFO
        /// </summary>
        /// <param name="node"></param>
        /// <param name="tag"></param>
        private void GetAttributes(XmlNode node, ref CIM_INFO tag)
        {
            if (node.Attributes.Count > 0)
            {
                tag.arc_code = getAttributes<string>(node, "arc_code");
                tag.arr_agent_code_1 = getAttributes<string>(node, "arr_agent_code_1");
                tag.arr_agent_code_2 = getAttributes<string>(node, "arr_agent_code_2");
                tag.arr_agent_code_3 = getAttributes<string>(node, "arr_agent_code_3");
                tag.arr_agent_code_4 = getAttributes<string>(node, "arr_agent_code_4");
                tag.custom_stn_code = getAttributes<string>(node, "custom_stn_code");
                tag.custom_stn_name = getAttributes<string>(node, "custom_stn_name");
                tag.custom_stn_name_de = getAttributes<string>(node, "custom_stn_name_de");
                tag.cuv = getAttributes<int?>(node, "cuv");
                tag.dep_agent_code_1 = getAttributes<string>(node, "dep_agent_code_1");
                tag.dep_agent_code_2 = getAttributes<string>(node, "dep_agent_code_2");
                tag.dep_agent_code_3 = getAttributes<string>(node, "dep_agent_code_3");
                tag.dep_agent_code_4 = getAttributes<string>(node, "dep_agent_code_4");
                tag.export_mark = getAttributes<int?>(node, "export_mark");
                tag.extraordinarily = getAttributes<int?>(node, "extraordinarily");
                tag.fr_fracht_max = getAttributes<double?>(node, "fr_fracht_max");
                tag.fr_fracht_sum = getAttributes<double?>(node, "fr_fracht_sum");
                tag.incoterms_code = getAttributes<string>(node, "incoterms_code");
                tag.incoterms_station = getAttributes<string>(node, "incoterms_station");
                tag.interest_currency = getAttributes<int?>(node, "interest_currency");
                tag.interest_value = getAttributes<double?>(node, "interest_value");
                tag.mrn_code = getAttributes<string>(node, "mrn_code");
                tag.mrn_condition = getAttributes<int?>(node, "mrn_condition");
                tag.nonexpert_system = getAttributes<int?>(node, "nonexpert_system");
                tag.others_agents = getAttributes<string>(node, "others_agents");
                tag.payment = getAttributes<double?>(node, "payment");
                tag.payment_bill_date = getAttributes<DateTime?>(node, "payment_bill_date");
                tag.payment_bill_num = getAttributes<string>(node, "payment_bill_num");
                tag.payment_currency = getAttributes<int?>(node, "payment_currency");
                tag.place_date_from = getAttributes<DateTime?>(node, "place_date_from");
                tag.place_from = getAttributes<string>(node, "place_from");
                tag.place_name_from = getAttributes<string>(node, "place_name_from");
                tag.place_name_from_de = getAttributes<string>(node, "place_name_from_de");
                tag.place_name_to = getAttributes<string>(node, "place_name_to");
                tag.place_rw_from = getAttributes<int?>(node, "place_rw_from");
                tag.place_rw_smgs_from = getAttributes<int?>(node, "place_rw_smgs_from");
                tag.place_to = getAttributes<string>(node, "place_to");
                tag.place_transhipment_name = getAttributes<string>(node, "place_transhipment_name");
                tag.place_transhipment_name_de = getAttributes<string>(node, "place_transhipment_name_de");
                tag.place_transhipment_rw = getAttributes<int?>(node, "place_transhipment_rw");
                tag.place_transhipment_stn = getAttributes<string>(node, "place_transhipment_stn");
                tag.primary_agent = getAttributes<string>(node, "primary_agent");
                tag.responsible_person = getAttributes<string>(node, "responsible_person");
                tag.route_info = getAttributes<string>(node, "route_info");
                tag.sender_note = getAttributes<string>(node, "sender_note");
                tag.weight_name_de = getAttributes<string>(node, "weight_name_de");
            }
        }

        #region CLIENT
        /// <summary>
        /// Заполнить атрибуты CLIENT
        /// </summary>
        /// <param name="node"></param>
        /// <param name="tag"></param>
        private void GetAttributes(XmlNode node, ref CLIENT tag)
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
        /// Заполнить атрибуты CLIENT_LOC
        /// </summary>
        /// <param name="node"></param>
        /// <param name="tag"></param>
        private void GetAttributes(XmlNode node, ref CLIENT_LOC tag)
        {
            if (node.Attributes.Count > 0)
            {
                tag.adress = getAttributes<string>(node, "adress");
                tag.lang = getAttributes<string>(node, "lang");
                tag.name = getAttributes<string>(node, "name");
            }
        }
        #endregion

        /// <summary>
        /// Заполнить атрибуты COM_COND
        /// </summary>
        /// <param name="node"></param>
        /// <param name="tag"></param>
        private void GetAttributes(XmlNode node, ref COM_COND tag)
        {
            if (node.Attributes.Count > 0)
            {
                tag.code = getAttributes<int?>(node, "code");
                tag.param = getAttributes<string>(node, "param");
                tag.param_de = getAttributes<string>(node, "param_de");
            }
        }

        #region CONT
        /// <summary>
        /// Заполнить атрибуты CONT
        /// </summary>
        /// <param name="node"></param>
        /// <param name="tag"></param>
        private void GetAttributes(XmlNode node, ref CONT tag)
        {
            if (node.Attributes.Count > 0)
            {
                tag.cim_size_type = getAttributes<int?>(node, "cim_size_type");
                tag.gruzp = getAttributes<int?>(node, "gruzp");
                tag.info_cont = getAttributes<string>(node, "info_cont");
                tag.kod_adm = getAttributes<int?>(node, "kod_adm");
                tag.kod_tiporazmer = getAttributes<string>(node, "kod_tiporazmer");
                tag.nom_cont = getAttributes<string>(node, "nom_cont");
                tag.pr_sobst = getAttributes<int?>(node, "pr_sobst");
                tag.prizn = getAttributes<int?>(node, "prizn");
                tag.tiporazmer = getAttributes<string>(node, "tiporazmer");
                tag.ves_tary_arc = getAttributes<int?>(node, "ves_tary_arc");
                tag.nom_vag = getAttributes<int?>(node, "nom_vag");
            }
            foreach (XmlNode chield_node in node.ChildNodes)
            {
                if (chield_node.Name == "PAY_K")
                {
                    PAY_K pay_k = new PAY_K();
                    GetAttributes(chield_node, ref pay_k);
                    // Добавим клиентов
                    List<PAY_K> list = tag.pay_k.ToList();
                    list.Add(pay_k);
                    tag.pay_k = list.ToArray();
                }
                if (chield_node.Name == "COLLECT_K")
                {
                    COLLECT_K collect_k = new COLLECT_K();
                    GetAttributes(chield_node, ref collect_k);
                    tag.collect_k = collect_k;
                }
                if (chield_node.Name == "ZPU_K")
                {
                    ZPU_K zpu_k = new ZPU_K();
                    GetAttributes(chield_node, ref zpu_k);
                    // Добавим клиентов
                    List<ZPU_K> list = tag.zpu_k.ToList();
                    list.Add(zpu_k);
                    tag.zpu_k = list.ToArray();
                }

            }
        }
        /// <summary>
        /// Заполнить атрибуты PAY_K
        /// </summary>
        /// <param name="node"></param>
        /// <param name="tag"></param>
        private void GetAttributes(XmlNode node, ref PAY_K tag)
        {
            if (node.Attributes.Count > 0)
            {
                tag.currency = getAttributes<int?>(node, "currency");
                tag.date = getAttributes<DateTime?>(node, "date");
                tag.kod = getAttributes<string>(node, "kod");
                tag.podkod = getAttributes<string>(node, "podkod");
                tag.summa = getAttributes<int?>(node, "summa");
                tag.stn = getAttributes<string>(node, "stn");
            }
        }
        /// <summary>
        /// Заполнить атрибуты COLLECT_K
        /// </summary>
        /// <param name="node"></param>
        /// <param name="tag"></param>
        private void GetAttributes(XmlNode node, ref COLLECT_K tag)
        {
            if (node.Attributes.Count > 0)
            {
                tag.danger = getAttributes<string>(node, "danger");
                //tag.danger_ak_pr = getAttributes<string>(node, "danger_ak_pr");
                tag.danger_kod = getAttributes<string>(node, "danger_kod");
                tag.danger_proper_name = getAttributes<string>(node, "danger_proper_name");
                tag.danger_signs = getAttributes<string>(node, "danger_signs");
                tag.danger_sng = getAttributes<int?>(node, "danger_sng");
                tag.danger_text = getAttributes<string>(node, "danger_text");
                tag.date_strah_dog = getAttributes<DateTime?>(node, "date_strah_dog");
                tag.kod_etsng = getAttributes<string>(node, "kod_etsng");
                tag.kod_gng = getAttributes<string>(node, "kod_gng");
                tag.kol_devices = getAttributes<int?>(node, "kol_devices");
                tag.kol_pac = getAttributes<int?>(node, "kol_pac");
                tag.kol_packet = getAttributes<int?>(node, "kol_packet");
                tag.name_etsng = getAttributes<string>(node, "name_etsng");
                tag.name_gng = getAttributes<string>(node, "name_gng");
                tag.name_komp = getAttributes<string>(node, "name_komp");
                tag.nhm_id = getAttributes<string>(node, "nhm_id");
                tag.nhm_name = getAttributes<string>(node, "nhm_name");
                tag.nhm_name_de = getAttributes<string>(node, "nhm_name_de");
                tag.nom_card = getAttributes<string>(node, "nom_card");
                tag.nom_oon = getAttributes<string>(node, "nom_oon");
                tag.nom_polis = getAttributes<string>(node, "nom_polis");
                tag.p_danger = getAttributes<string>(node, "p_danger");
                tag.pac = getAttributes<string>(node, "pac");
                tag.packing_group = getAttributes<string>(node, "packing_group");
                tag.danger_ak_pr = getAttributes<int?>(node, "danger_ak_pr");
                tag.pr_packet = getAttributes<int?>(node, "pr_packet");
                tag.strah_komp = getAttributes<int?>(node, "strah_komp");
                tag.vesg = getAttributes<int?>(node, "vesg");
            }
        }
        /// <summary>
        /// Заполнить атрибуты ZPU_K
        /// </summary>
        /// <param name="node"></param>
        /// <param name="tag"></param>
        private void GetAttributes(XmlNode node, ref ZPU_K tag)
        {
            if (node.Attributes.Count > 0)
            {
                tag.esr_zpu = getAttributes<string>(node, "esr_zpu");
                tag.nom_zpu = getAttributes<string>(node, "nom_zpu");
                tag.sobst_zpu = getAttributes<int?>(node, "sobst_zpu");
                tag.zd_kod = getAttributes<int?>(node, "zd_kod");
                tag.zpu = getAttributes<int?>(node, "zpu");
            }
        }
        #endregion
        /// <summary>
        /// Заполнить атрибуты FRONTIER_MARK
        /// </summary>
        /// <param name="node"></param>
        /// <param name="tag"></param>
        private void GetAttributes(XmlNode node, ref FRONTIER_MARK tag)
        {
            if (node.Attributes.Count > 0)
            {
                tag.carrier_kod = getAttributes<int?>(node, "carrier_kod");
                tag.carrier_name = getAttributes<string>(node, "carrier_name");
                tag.cross_date = getAttributes<DateTime?>(node, "cross_date");
                tag.direction = getAttributes<int?>(node, "direction");
                tag.esr = getAttributes<int?>(node, "esr");
                tag.esr_name = getAttributes<string>(node, "esr_name");
                tag.zd_kod = getAttributes<int?>(node, "zd_kod");
            }
        }

        #region OTPRDP
        /// <summary>
        /// Заполнить атрибуты OTPRDP
        /// </summary>
        /// <param name="node"></param>
        /// <param name="tag"></param>
        private void GetAttributes(XmlNode node, ref OTPRDP tag)
        {
            if (node.Attributes.Count > 0)
            {
                tag.admin_otpr = getAttributes<int?>(node, "admin_otpr");
                tag.nom_osn_doc = getAttributes<int?>(node, "nom_osn_doc");
                tag.ser_osn_doc = getAttributes<string>(node, "ser_osn_doc");
                tag.stn_name_otpr = getAttributes<string>(node, "stn_name_otpr");
                tag.stn_otpr = getAttributes<string>(node, "stn_otpr");
                tag.zd_otpr = getAttributes<int?>(node, "zd_otpr");
                tag.zd_nazn = getAttributes<int?>(node, "zd_nazn");
            }
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
                if (chield_node.Name == "ROUTE_LOC")
                {
                    OTPRDP_LOC otrrdp_loc = new OTPRDP_LOC();
                    GetAttributes(chield_node, ref otrrdp_loc);
                    tag.otprdp_loc = otrrdp_loc;
                }
            }
        }
        /// <summary>
        /// Заполнить атрибуты OTPRDP_LOC
        /// </summary>
        /// <param name="node"></param>
        /// <param name="tag"></param>
        private void GetAttributes(XmlNode node, ref OTPRDP_LOC tag)
        {
            if (node.Attributes.Count > 0)
            {
                tag.lang = getAttributes<string>(node, "lang");
                tag.stn_name_otpr = getAttributes<string>(node, "stn_name_otpr");
            }
        }

        #endregion

        /// <summary>
        /// Заполнить атрибуты PAC
        /// </summary>
        /// <param name="node"></param>
        /// <param name="tag"></param>
        private void GetAttributes(XmlNode node, ref PAC tag)
        {
            if (node.Attributes.Count > 0)
            {
                tag.kol_pac = getAttributes<int?>(node, "kol_pac");
                tag.weight_place_br = getAttributes<int?>(node, "weight_place_br");
                tag.weight_place_net = getAttributes<int?>(node, "weight_place_net");
            }
        }
        /// <summary>
        /// Заполнить атрибуты PASS_MARK
        /// </summary>
        /// <param name="node"></param>
        /// <param name="tag"></param>
        private void GetAttributes(XmlNode node, ref PASS_MARK tag)
        {
            if (node.Attributes.Count > 0)
            {
                tag.carrier_kod = getAttributes<int?>(node, "carrier_kod");
                tag.carrier_name = getAttributes<string>(node, "carrier_name");
                tag.esr = getAttributes<int?>(node, "esr");
                tag.esr_name = getAttributes<string>(node, "esr_name");
                tag.pass_date = getAttributes<DateTime?>(node, "pass_date");
                tag.zd_kod = getAttributes<int?>(node, "zd_kod");
            }
        }

        #region PL
        /// <summary>
        /// Заполнить атрибуты PL
        /// </summary>
        /// <param name="node"></param>
        /// <param name="tag"></param>
        private void GetAttributes(XmlNode node, ref PL tag)
        {
            if (node.Attributes.Count > 0)
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
            }
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
        /// <summary>
        /// Заполнить атрибуты PAY
        /// </summary>
        /// <param name="node"></param>
        /// <param name="tag"></param>
        private void GetAttributes(XmlNode node, ref PAY tag)
        {
            if (node.Attributes.Count > 0)
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
        }
        /// <summary>
        /// Заполнить атрибуты PL_LOC
        /// </summary>
        /// <param name="node"></param>
        /// <param name="tag"></param>
        private void GetAttributes(XmlNode node, ref PL_LOC tag)
        {
            if (node.Attributes.Count > 0)
            {
                tag.adress = getAttributes<string>(node, "adress");
                tag.lang = getAttributes<string>(node, "lang");
                tag.name = getAttributes<string>(node, "name");
            }
        }
        #endregion

        /// <summary>
        /// Заполнить атрибуты PROLONGATION
        /// </summary>
        /// <param name="node"></param>
        /// <param name="tag"></param>
        private void GetAttributes(XmlNode node, ref PROLONGATION tag)
        {
            if (node.Attributes.Count > 0)
            {
                tag.carrier_kod = getAttributes<int?>(node, "carrier_kod");
                tag.carrier_name = getAttributes<string>(node, "carrier_name");
                tag.date_end_delay = getAttributes<DateTime?>(node, "date_end_delay");
                tag.date_start_delay = getAttributes<DateTime?>(node, "date_start_delay");
                tag.esr = getAttributes<int?>(node, "esr");
                tag.esr_name = getAttributes<string>(node, "esr_name");
                tag.reason = getAttributes<int?>(node, "reason");
                tag.type = getAttributes<int?>(node, "type");
                tag.user_reason_name = getAttributes<string>(node, "user_reason_name");
                tag.zd_kod = getAttributes<int?>(node, "zd_kod");
            }
        }

        #region ROUTE
        /// <summary>
        /// Заполнить атрибуты ROUTE
        /// </summary>
        /// <param name="node"></param>
        /// <param name="tag"></param>
        private void GetAttributes(XmlNode node, ref ROUTE tag)
        {
            if (node.Attributes.Count > 0)
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
            }
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
        /// <summary>
        /// Заполнить атрибуты JOINT
        /// </summary>
        /// <param name="node"></param>
        /// <param name="tag"></param>
        private void GetAttributes(XmlNode node, ref JOINT tag)
        {
            if (node.Attributes.Count > 0)
            {
                tag.cross_time = getAttributes<DateTime?>(node, "cross_time");
                tag.direction = getAttributes<string>(node, "direction");
                tag.port_name = getAttributes<string>(node, "port_name");
                tag.stn = getAttributes<string>(node, "stn");
                tag.stn_name = getAttributes<string>(node, "stn_name");
                tag.admin = getAttributes<int?>(node, "admin");
                tag.zd_kod = getAttributes<int?>(node, "zd_kod");
            }
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
        /// <summary>
        /// Заполнить атрибуты JOINT_LOC
        /// </summary>
        /// <param name="node"></param>
        /// <param name="tag"></param>
        private void GetAttributes(XmlNode node, ref JOINT_LOC tag)
        {
            if (node.Attributes.Count > 0)
            {
                tag.stn_name = getAttributes<string>(node, "stn_name");
                tag.lang = getAttributes<string>(node, "lang");
            }
        }
        /// <summary>
        /// Заполнить атрибуты PEREADR_INFO
        /// </summary>
        /// <param name="node"></param>
        /// <param name="tag"></param>
        public void GetAttributes(XmlNode node, ref PEREADR_INFO tag)
        {
            if (node.Attributes.Count > 0)
            {
                tag.date_nakaz = getAttributes<DateTime?>(node, "date_nakaz");
                tag.date_pereadr = getAttributes<DateTime?>(node, "date_pereadr");
                tag.distance = getAttributes<int?>(node, "distance");
                tag.nakaz = getAttributes<string>(node, "nakaz");
                tag.nom_perv_doc = getAttributes<int?>(node, "nom_perv_doc");
                tag.ser_perv_doc = getAttributes<string>(node, "ser_perv_doc");
                tag.type_pay_old = getAttributes<string>(node, "type_pay_old");
            }
        }
        /// <summary>
        /// Заполнить атрибуты ROUTE_LOC
        /// </summary>
        /// <param name="node"></param>
        /// <param name="tag"></param>
        private void GetAttributes(XmlNode node, ref ROUTE_LOC tag)
        {
            if (node.Attributes.Count > 0)
            {
                tag.lang = getAttributes<string>(node, "lang");
                tag.name_from = getAttributes<string>(node, "name_from");
                tag.name_to = getAttributes<string>(node, "name_to");
            }
        }
        #endregion

        /// <summary>
        /// Заполнить атрибуты RW_STAT
        /// </summary>
        /// <param name="node"></param>
        /// <param name="tag"></param>
        private void GetAttributes(XmlNode node, ref RW_STAT tag)
        {
            if (node.Attributes.Count > 0)
            {
                tag.code = getAttributes<int?>(node, "code");
                tag.param = getAttributes<string>(node, "param");
                tag.param_de = getAttributes<string>(node, "param_de");
            }
        }
        /// <summary>
        /// Заполнить атрибуты REFUSE_EPD
        /// </summary>
        /// <param name="node"></param>
        /// <param name="tag"></param>
        private void GetAttributes(XmlNode node, ref REFUSE_EPD tag)
        {
            if (node.Attributes.Count > 0)
            {
                tag.act_date = getAttributes<DateTime?>(node, "act_date");
                tag.act_nom = getAttributes<string>(node, "act_nom");
                tag.esr = getAttributes<string>(node, "esr");
                tag.info = getAttributes<string>(node, "info");
                tag.pib = getAttributes<string>(node, "pib");
                tag.rang = getAttributes<string>(node, "rang");
            }
        }
        /// <summary>
        /// Заполнить атрибуты REISSUE_INFO
        /// </summary>
        /// <param name="node"></param>
        /// <param name="tag"></param>
        private void GetAttributes(XmlNode node, ref REISSUE_INFO tag)
        {
            if (node.Attributes.Count > 0)
            {
                tag.date_otpr = getAttributes<DateTime?>(node, "date_otpr");
                tag.doc_nom = getAttributes<int?>(node, "doc_nom");
                tag.doc_seria = getAttributes<string>(node, "doc_seria");
            }
        }
        /// <summary>
        /// Заполнить атрибуты SCHEMA
        /// </summary>
        /// <param name="node"></param>
        /// <param name="tag"></param>
        private void GetAttributes(XmlNode node, ref SCHEMA tag)
        {
            if (node.Attributes.Count > 0)
            {
                tag.carry_sch = getAttributes<double?>(node, "carry_sch");
                tag.pr_sch = getAttributes<int?>(node, "pr_sch");
            }
        }
        /// <summary>
        /// Заполнить атрибуты SENDER_DOC
        /// </summary>
        /// <param name="node"></param>
        /// <param name="tag"></param>
        private void GetAttributes(XmlNode node, ref SENDER_DOC tag)
        {
            if (node.Attributes.Count > 0)
            {
                tag.id = getAttributes<int?>(node, "id");
                tag.description = getAttributes<string>(node, "description");
                tag.doc_date = getAttributes<DateTime?>(node, "doc_date");
                tag.doc_type = getAttributes<string>(node, "doc_type");
                tag.doc_type_name = getAttributes<string>(node, "doc_type_name");
                tag.kod_zd_use = getAttributes<int?>(node, "kod_zd_use");
                tag.kol = getAttributes<int?>(node, "kol");
            }
        }
        /// <summary>
        /// Заполнить атрибуты SEND_STAT
        /// </summary>
        /// <param name="node"></param>
        /// <param name="tag"></param>
        private void GetAttributes(XmlNode node, ref SEND_STAT tag)
        {
            if (node.Attributes.Count > 0)
            {
                tag.code = getAttributes<int?>(node, "code");
                tag.param = getAttributes<string>(node, "param");
                tag.param_de = getAttributes<string>(node, "param_de");
            }
        }
        /// <summary>
        /// Заполнить атрибуты SHTEMPEL
        /// </summary>
        /// <param name="node"></param>
        /// <param name="tag"></param>
        private void GetAttributes(XmlNode node, ref SHTEMPEL tag)
        {
            if (node.Attributes.Count > 0)
            {
                tag.column_num = getAttributes<string>(node, "column_num");
                tag.info_sht = getAttributes<string>(node, "info_sht");
                tag.nom_sht = getAttributes<int?>(node, "nom_sht");
            }
        }
        /// <summary>
        /// Заполнить атрибуты SPEC_COND
        /// </summary>
        /// <param name="node"></param>
        /// <param name="tag"></param>
        private void GetAttributes(XmlNode node, ref SPEC_COND tag)
        {
            if (node.Attributes.Count > 0)
            {
                tag.code = getAttributes<int?>(node, "code");
                tag.name_metal = getAttributes<string>(node, "name_metal");
                tag.name_val = getAttributes<string>(node, "name_val");
                tag.val = getAttributes<string>(node, "val");
            }
        }
        /// <summary>
        /// Заполнить атрибуты TAKS
        /// </summary>
        /// <param name="node"></param>
        /// <param name="tag"></param>
        private void GetAttributes(XmlNode node, ref TAKS tag)
        {
            if (node.Attributes.Count > 0)
            {
                tag.coeff_mode = getAttributes<int?>(node, "coeff_mode");
                tag.coeff_type = getAttributes<int?>(node, "coeff_type");
                tag.coeff_value = getAttributes<double?>(node, "coeff_value");
                tag.iskl_mode = getAttributes<int?>(node, "iskl_mode");
                tag.iskl_tar = getAttributes<int?>(node, "iskl_tar");
            }
        }
        /// <summary>
        /// Заполнить атрибуты TEXT
        /// </summary>
        /// <param name="node"></param>
        /// <param name="tag"></param>
        private void GetAttributes(XmlNode node, ref TEXT tag)
        {
            if (node.Attributes.Count > 0)
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
        }

        #region VAGON
        /// <summary>
        /// Заполнить атрибуты VAGON
        /// </summary>
        /// <param name="node"></param>
        /// <param name="tag"></param>
        private void GetAttributes(XmlNode node, ref VAGON tag)
        {
            if (node.Attributes.Count > 0)
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
                tag.name_firm_operator = getAttributes<string>(node, "name_firm_operator");
                tag.name_firm_renter = getAttributes<string>(node, "name_firm_renter");
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
            foreach (XmlNode chield_node in node.ChildNodes)
            {
                if (chield_node.Name == "PEREGR_V")
                {
                    PEREGR_V peregr_v = new PEREGR_V();
                    GetAttributes(chield_node, ref peregr_v);
                    tag.peregr_v = peregr_v;
                }
                if (chield_node.Name == "PAY_V")
                {
                    PAY_V pay_v = new PAY_V();
                    GetAttributes(chield_node, ref pay_v);
                    // Добавим клиентов
                    List<PAY_V> list = tag.pay_v.ToList();
                    list.Add(pay_v);
                    tag.pay_v = list.ToArray();
                }
                if (chield_node.Name == "COLLECT_V")
                {
                    COLLECT_V collect_v = new COLLECT_V();
                    GetAttributes(chield_node, ref collect_v);
                    // Добавим клиентов
                    List<COLLECT_V> list = tag.collect_v.ToList();
                    list.Add(collect_v);
                    tag.collect_v = list.ToArray();
                }
                if (chield_node.Name == "TOOLS")
                {
                    TOOLS tools = new TOOLS();
                    GetAttributes(chield_node, ref tools);
                    // Добавим клиентов
                    List<TOOLS> list = tag.tools.ToList();
                    list.Add(tools);
                    tag.tools = list.ToArray();
                }
                if (chield_node.Name == "ZPU_V")
                {
                    ZPU_V zpu_v = new ZPU_V();
                    GetAttributes(chield_node, ref zpu_v);
                    // Добавим клиентов
                    List<ZPU_V> list = tag.zpu_v.ToList();
                    list.Add(zpu_v);
                    tag.zpu_v = list.ToArray();
                }
            }
        }
        /// <summary>
        /// Заполнить атрибуты PEREGR_V
        /// </summary>
        /// <param name="node"></param>
        /// <param name="tag"></param>
        private void GetAttributes(XmlNode node, ref PEREGR_V tag)
        {
            if (node.Attributes.Count > 0)
            {
                tag.esr_per = getAttributes<string>(node, "esr_per");
                tag.kol_devices = getAttributes<int?>(node, "kol_devices");
                tag.kol_pac = getAttributes<int?>(node, "kol_pac");
                tag.kol_packet = getAttributes<int?>(node, "kol_packet");
                tag.nom_pereg = getAttributes<string>(node, "nom_pereg");
                tag.vesg = getAttributes<int?>(node, "vesg");
            }
        }
        /// <summary>
        /// Заполнить атрибуты PAY_V
        /// </summary>
        /// <param name="node"></param>
        /// <param name="tag"></param>
        private void GetAttributes(XmlNode node, ref PAY_V tag)
        {
            if (node.Attributes.Count > 0)
            {
                tag.currency = getAttributes<int?>(node, "currency");
                tag.date = getAttributes<DateTime?>(node, "date");
                tag.kod = getAttributes<string>(node, "kod");
                tag.podkod = getAttributes<string>(node, "podkod");
                tag.summa = getAttributes<int?>(node, "summa");
                tag.stn = getAttributes<string>(node, "stn");
            }
        }
        /// <summary>
        /// Заполнить атрибуты COLLECT_V
        /// </summary>
        /// <param name="node"></param>
        /// <param name="tag"></param>
        private void GetAttributes(XmlNode node, ref COLLECT_V tag)
        {
            if (node.Attributes.Count > 0)
            {
                tag.ballast = getAttributes<double?>(node, "ballast");
                tag.danger = getAttributes<string>(node, "danger");
                tag.danger_ak_pr = getAttributes<string>(node, "danger_ak_pr");
                tag.danger_kod = getAttributes<string>(node, "danger_kod");
                tag.danger_proper_name = getAttributes<string>(node, "danger_proper_name");
                tag.danger_signs = getAttributes<string>(node, "danger_signs");
                tag.danger_sng = getAttributes<int?>(node, "danger_sng");
                tag.danger_text = getAttributes<string>(node, "danger_text");
                tag.date_strah_dog = getAttributes<DateTime?>(node, "date_strah_dog");
                tag.density = getAttributes<double?>(node, "density");
                tag.density20deg = getAttributes<double?>(node, "density20deg");
                tag.kod_etsng = getAttributes<string>(node, "kod_etsng");
                tag.kol_devices = getAttributes<int?>(node, "kol_devices");
                tag.kod_gng = getAttributes<string>(node, "kod_gng");
                tag.kol_pac = getAttributes<int?>(node, "kol_pac");
                tag.kol_packet = getAttributes<int?>(node, "kol_packet");
                tag.mark_gr = getAttributes<string>(node, "mark_gr");
                tag.metod_gr = getAttributes<int?>(node, "metod_gr");
                tag.name_etsng = getAttributes<string>(node, "name_etsng");
                tag.name_gng = getAttributes<string>(node, "name_gng");
                tag.name_komp = getAttributes<string>(node, "name_komp");
                tag.negab_gr = getAttributes<int?>(node, "negab_gr");
                tag.nhm_id = getAttributes<string>(node, "nhm_id");
                tag.nhm_name = getAttributes<string>(node, "nhm_name");
                tag.nhm_name_de = getAttributes<string>(node, "nhm_name_de");
                tag.nom_card = getAttributes<string>(node, "nom_card");
                tag.nom_oon = getAttributes<string>(node, "nom_oon");
                tag.nom_polis = getAttributes<string>(node, "nom_polis");
                tag.nomer_gr = getAttributes<string>(node, "nomer_gr");
                tag.p_danger = getAttributes<string>(node, "p_danger");
                tag.pac = getAttributes<string>(node, "pac");
                tag.packing_group = getAttributes<string>(node, "packing_group");
                tag.pr_packet = getAttributes<string>(node, "pr_packet");
                tag.sing_gr = getAttributes<string>(node, "sing_gr");
                tag.strah_komp = getAttributes<int?>(node, "strah_komp");
                tag.tank_level = getAttributes<int?>(node, "tank_level");
                tag.temp = getAttributes<string>(node, "temp");
                tag.vesg = getAttributes<int?>(node, "vesg");
                tag.waterlevel = getAttributes<double?>(node, "waterlevel");
                tag.weight_place_br_gr = getAttributes<int?>(node, "weight_place_br_gr");
                tag.weight_place_net_gr = getAttributes<int?>(node, "weight_place_net_gr");
                tag.zvvt_num = getAttributes<string>(node, "zvvt_num");
            }
        }
        /// <summary>
        /// Заполнить атрибуты TOOLS
        /// </summary>
        /// <param name="node"></param>
        /// <param name="tag"></param>
        private void GetAttributes(XmlNode node, ref TOOLS tag)
        {
            if (node.Attributes.Count > 0)
            {
                tag.ves_tools = getAttributes<int?>(node, "ves_tools");
            }
        }
        /// <summary>
        /// Заполнить атрибуты ZPU_V
        /// </summary>
        /// <param name="node"></param>
        /// <param name="tag"></param>
        private void GetAttributes(XmlNode node, ref ZPU_V tag)
        {
            if (node.Attributes.Count > 0)
            {
                tag.esr_zpu = getAttributes<string>(node, "esr_zpu");
                tag.nom_zpu = getAttributes<string>(node, "nom_zpu");
                tag.sobst_zpu = getAttributes<string>(node, "sobst_zpu");
                tag.zd_kod = getAttributes<int?>(node, "zd_kod");
                tag.zpu = getAttributes<string>(node, "zpu");
            }
        }
        #endregion

        #endregion

        #region ЗАПОЛНИТЬ ТЕГИ
        /// <summary>
        /// Заполним тег ACTS
        /// </summary>
        /// <param name="node"></param>
        /// <param name="otpr"></param>
        private void GetTagACTS(XmlNode node, ref OTPR otpr)
        {
            ACTS tag = new ACTS();
            GetAttributes(node, ref tag);
            // Добавим клиентов
            List<ACTS> list = otpr.acts.ToList();
            list.Add(tag);
            otpr.acts = list.ToArray();
        }
        /// <summary>
        /// Заполним тег CARRIER
        /// </summary>
        /// <param name="node"></param>
        /// <param name="otpr"></param>
        private void GetTagCARRIER(XmlNode node, ref OTPR otpr)
        {
            CARRIER tag = new CARRIER();
            GetAttributes(node, ref tag);
            // Добавим клиентов
            List<CARRIER> list = otpr.carrier.ToList();
            list.Add(tag);
            otpr.carrier = list.ToArray();
        }
        /// <summary>
        /// Заполним тег CIM_INFO
        /// </summary>
        /// <param name="node"></param>
        /// <param name="otpr"></param>
        private void GetTagCIM_INFO(XmlNode node, ref OTPR otpr)
        {
            CIM_INFO tag = new CIM_INFO();
            GetAttributes(node, ref tag);
            otpr.cim_info = tag;
        }

        /// <summary>
        /// Заполним тег CLIENT
        /// </summary>
        /// <param name="node"></param>
        /// <param name="otpr"></param>
        private void GetTagCLIENT(XmlNode node, ref OTPR otpr)
        {
            CLIENT tag = new CLIENT();
            GetAttributes(node, ref tag);
            // Добавим клиентов
            List<CLIENT> list = otpr.client.ToList();
            list.Add(tag);
            otpr.client = list.ToArray();
        }
        /// <summary>
        /// Заполним тег COM_COND
        /// </summary>
        /// <param name="node"></param>
        /// <param name="otpr"></param>
        private void GetTagCOM_COND(XmlNode node, ref OTPR otpr)
        {
            COM_COND tag = new COM_COND();
            GetAttributes(node, ref tag);
            // Добавим клиентов
            List<COM_COND> list = otpr.com_cond.ToList();
            list.Add(tag);
            otpr.com_cond = list.ToArray();
        }
        /// <summary>
        /// Заполним тег CONT
        /// </summary>
        /// <param name="node"></param>
        /// <param name="otpr"></param>
        private void GetTagCONT(XmlNode node, ref OTPR otpr)
        {
            CONT tag = new CONT();
            GetAttributes(node, ref tag);
            // Добавим клиентов
            List<CONT> list = otpr.cont.ToList();
            list.Add(tag);
            otpr.cont = list.ToArray();
        }
        /// <summary>
        /// Заполним тег FRONTIER_MARK
        /// </summary>
        /// <param name="node"></param>
        /// <param name="otpr"></param>
        private void GetTagFRONTIER_MARK(XmlNode node, ref OTPR otpr)
        {
            FRONTIER_MARK tag = new FRONTIER_MARK();
            GetAttributes(node, ref tag);
            // Добавим клиентов
            List<FRONTIER_MARK> list = otpr.frontier_mark.ToList();
            list.Add(tag);
            otpr.frontier_mark = list.ToArray();
        }
        /// <summary>
        /// Заполним тег OTPRDP
        /// </summary>
        /// <param name="node"></param>
        /// <param name="otpr"></param>
        private void GetTagOTPRDP(XmlNode node, ref OTPR otpr)
        {
            OTPRDP tag = new OTPRDP();
            GetAttributes(node, ref tag);
            otpr.otprdp = tag;
        }
        /// <summary>
        /// Заполним тег PAC
        /// </summary>
        /// <param name="node"></param>
        /// <param name="otpr"></param>
        private void GetTagPAC(XmlNode node, ref OTPR otpr)
        {
            PAC tag = new PAC();
            GetAttributes(node, ref tag);
            otpr.pac = tag;
        }
        /// <summary>
        /// Заполним тег PASS_MARK
        /// </summary>
        /// <param name="node"></param>
        /// <param name="otpr"></param>
        private void GetTagPASS_MARK(XmlNode node, ref OTPR otpr)
        {
            PASS_MARK tag = new PASS_MARK();
            GetAttributes(node, ref tag);
            // Добавим клиентов
            List<PASS_MARK> list = otpr.pass_mark.ToList();
            list.Add(tag);
            otpr.pass_mark = list.ToArray();
        }
        /// <summary>
        /// Заполним тег PL
        /// </summary>
        /// <param name="node"></param>
        /// <param name="otpr"></param>
        private void GetTagPL(XmlNode node, ref OTPR otpr)
        {
            PL tag = new PL();
            GetAttributes(node, ref tag);
            // Добавим клиентов
            List<PL> list = otpr.pl.ToList();
            list.Add(tag);
            otpr.pl = list.ToArray();
        }
        /// <summary>
        /// Заполним тег PROLONGATION
        /// </summary>
        /// <param name="node"></param>
        /// <param name="otpr"></param>
        private void GetTagPROLONGATION(XmlNode node, ref OTPR otpr)
        {
            PROLONGATION tag = new PROLONGATION();
            GetAttributes(node, ref tag);
            // Добавим клиентов
            List<PROLONGATION> list = otpr.prolongation.ToList();
            list.Add(tag);
            otpr.prolongation = list.ToArray();
        }

        /// <summary>
        /// Заполним тег ROUTE
        /// </summary>
        /// <param name="node"></param>
        /// <param name="otpr"></param>
        private void GetTagROUTE(XmlNode node, ref OTPR otpr)
        {
            ROUTE tag = new ROUTE();
            GetAttributes(node, ref tag);
            // Добавим клиентов
            List<ROUTE> list = otpr.route.ToList();
            list.Add(tag);
            otpr.route = list.ToArray();
        }
        /// <summary>
        /// Заполним тег RW_STAT
        /// </summary>
        /// <param name="node"></param>
        /// <param name="otpr"></param>
        private void GetTagRW_STAT(XmlNode node, ref OTPR otpr)
        {
            RW_STAT tag = new RW_STAT();
            GetAttributes(node, ref tag);
            // Добавим клиентов
            List<RW_STAT> list = otpr.rw_stat.ToList();
            list.Add(tag);
            otpr.rw_stat = list.ToArray();
        }
        /// <summary>
        /// Заполним тег REFUSE_EPD
        /// </summary>
        /// <param name="node"></param>
        /// <param name="otpr"></param>
        private void GetTagREFUSE_EPD(XmlNode node, ref OTPR otpr)
        {
            REFUSE_EPD tag = new REFUSE_EPD();
            GetAttributes(node, ref tag);
            otpr.refuse_epd = tag;
        }
        /// <summary>
        /// Заполним тег REISSUE_INFO
        /// </summary>
        /// <param name="node"></param>
        /// <param name="otpr"></param>
        private void GetTagREISSUE_INFO(XmlNode node, ref OTPR otpr)
        {
            REISSUE_INFO tag = new REISSUE_INFO();
            GetAttributes(node, ref tag);
            otpr.reissue_info = tag;
        }
        /// <summary>
        /// Заполним тег SCHEMA
        /// </summary>
        /// <param name="node"></param>
        /// <param name="otpr"></param>
        private void GetTagSCHEMA(XmlNode node, ref OTPR otpr)
        {
            SCHEMA tag = new SCHEMA();
            GetAttributes(node, ref tag);
            // Добавим клиентов
            List<SCHEMA> list = otpr.shema.ToList();
            list.Add(tag);
            otpr.shema = list.ToArray();
        }
        /// <summary>
        /// Заполним тег SENDER_DOC
        /// </summary>
        /// <param name="node"></param>
        /// <param name="otpr"></param>
        private void GetTagSENDER_DOC(XmlNode node, ref OTPR otpr)
        {
            SENDER_DOC tag = new SENDER_DOC();
            GetAttributes(node, ref tag);
            // Добавим клиентов
            List<SENDER_DOC> list = otpr.sender_doc.ToList();
            list.Add(tag);
            otpr.sender_doc = list.ToArray();
        }
        /// <summary>
        /// Заполним тег SEND_STAT
        /// </summary>
        /// <param name="node"></param>
        /// <param name="otpr"></param>
        private void GetTagSEND_STAT(XmlNode node, ref OTPR otpr)
        {
            SEND_STAT tag = new SEND_STAT();
            GetAttributes(node, ref tag);
            // Добавим клиентов
            List<SEND_STAT> list = otpr.send_stat.ToList();
            list.Add(tag);
            otpr.send_stat = list.ToArray();
        }
        /// <summary>
        /// Заполним тег SHTEMPEL
        /// </summary>
        /// <param name="node"></param>
        /// <param name="otpr"></param>
        private void GetTagSHTEMPEL(XmlNode node, ref OTPR otpr)
        {
            SHTEMPEL tag = new SHTEMPEL();
            GetAttributes(node, ref tag);
            // Добавим клиентов
            List<SHTEMPEL> list = otpr.shtempel.ToList();
            list.Add(tag);
            otpr.shtempel = list.ToArray();
        }
        /// <summary>
        /// Заполним тег SPEC_COND
        /// </summary>
        /// <param name="node"></param>
        /// <param name="otpr"></param>
        private void GetTagSPEC_COND(XmlNode node, ref OTPR otpr)
        {
            SPEC_COND tag = new SPEC_COND();
            GetAttributes(node, ref tag);
            // Добавим клиентов
            List<SPEC_COND> list = otpr.spec_cond.ToList();
            list.Add(tag);
            otpr.spec_cond = list.ToArray();
        }
        /// <summary>
        /// Заполним тег TAKS
        /// </summary>
        /// <param name="node"></param>
        /// <param name="otpr"></param>
        private void GetTagTAKS(XmlNode node, ref OTPR otpr)
        {
            TAKS tag = new TAKS();
            GetAttributes(node, ref tag);
            otpr.taks = tag;
        }
        /// <summary>
        /// Заполним тег TEXT
        /// </summary>
        /// <param name="node"></param>
        /// <param name="otpr"></param>
        private void GetTagTEXT(XmlNode node, ref OTPR otpr)
        {
            TEXT tag = new TEXT();
            GetAttributes(node, ref tag);
            otpr.text = tag;
        }
        /// <summary>
        /// Заполним тег VAGON
        /// </summary>
        /// <param name="node"></param>
        /// <param name="otpr"></param>
        private void GetTagVAGON(XmlNode node, ref OTPR otpr)
        {
            VAGON tag = new VAGON();
            GetAttributes(node, ref tag);
            // Добавим клиентов
            List<VAGON> list = otpr.vagon.ToList();
            list.Add(tag);
            otpr.vagon = list.ToArray();
        }

        #endregion

        /// <summary>
        /// Вернуть OTPR по XML (предварительно получив финальный)
        /// </summary>
        /// <param name="xml"></param>
        /// <returns></returns>
        public OTPR XMLToOTPR(string xml) {
            return FinalXMLToOTPR(XMLToFinalXML(xml));
        }

        /// <summary>
        /// Получить OTPR по финальному XML
        /// </summary>
        /// <param name="xml"></param>
        /// <returns></returns>
        public OTPR FinalXMLToOTPR(string xml)
        {
            try
            {
                OTPR otpr = new OTPR();
                XmlDocument xDoc = new XmlDocument();
                xDoc.LoadXml(xml);
                XmlElement xRoot = xDoc.DocumentElement;
                if (xRoot.Name == "OTPR")
                {
                    // атрибуты
                    GetAttributes(xRoot, ref otpr);
                    foreach (XmlNode otpr_node in xRoot.ChildNodes)
                    {
                        switch (otpr_node.Name)
                        {
                            case "ACTS": { GetTagACTS(otpr_node, ref otpr); break; }
                            case "CARRIER": { GetTagCARRIER(otpr_node, ref otpr); break; }
                            case "CIM_INFO": { GetTagCIM_INFO(otpr_node, ref otpr); break; }
                            case "CLIENT": { GetTagCLIENT(otpr_node, ref otpr); break; }
                            case "COM_COND": { GetTagCOM_COND(otpr_node, ref otpr); break; }
                            case "CONT": { GetTagCONT(otpr_node, ref otpr); break; }
                            case "FRONTIER_MARK": { GetTagFRONTIER_MARK(otpr_node, ref otpr); break; }
                            case "OTPRDP": { GetTagOTPRDP(otpr_node, ref otpr); break; }
                            case "PAC": { GetTagPAC(otpr_node, ref otpr); break; }
                            case "PASS_MARK": { GetTagPASS_MARK(otpr_node, ref otpr); break; }
                            case "PL": { GetTagPL(otpr_node, ref otpr); break; }
                            case "PROLONGATION": { GetTagPROLONGATION(otpr_node, ref otpr); break; }
                            case "ROUTE": { GetTagROUTE(otpr_node, ref otpr); break; }
                            case "RW_STAT": { GetTagRW_STAT(otpr_node, ref otpr); break; }
                            case "REFUSE_EPD": { GetTagREFUSE_EPD(otpr_node, ref otpr); break; }
                            case "REISSUE_INFO": { GetTagREISSUE_INFO(otpr_node, ref otpr); break; }
                            case "SCHEMA": { GetTagSCHEMA(otpr_node, ref otpr); break; }
                            case "SENDER_DOC": { GetTagSENDER_DOC(otpr_node, ref otpr); break; }
                            case "SEND_STAT": { GetTagSEND_STAT(otpr_node, ref otpr); break; }
                            case "SHTEMPEL": { GetTagSHTEMPEL(otpr_node, ref otpr); break; }
                            case "SPEC_COND": { GetTagSPEC_COND(otpr_node, ref otpr); break; }
                            case "TAKS": { GetTagTAKS(otpr_node, ref otpr); break; }
                            case "TEXT": { GetTagTEXT(otpr_node, ref otpr); break; }
                            case "VAGON": { GetTagVAGON(otpr_node, ref otpr); break; }
                        }
                    }
                    return otpr;
                }
                return null;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetOTPROfFinalXML(xml={0})", xml), this.servece_owner, eventID);
                return null;
            }

        }
        #endregion

        #region ПОЛУЧЕНИЕ XML
        /// <summary>
        /// Найти узел по имени
        /// </summary>
        /// <param name="node"></param>
        /// <param name="name_node"></param>
        /// <returns></returns>
        public XmlNode GetNode(XmlNode node, string name_node)
        {
            foreach (XmlNode chield_node in node.ChildNodes)
            {
                if (chield_node.Name == name_node) return chield_node;
            }
            return null;
        }
        /// <summary>
        /// Найти все узлы по имени
        /// </summary>
        /// <param name="node"></param>
        /// <param name="name_node"></param>
        /// <returns></returns>
        public XmlNode[] GetNodes(XmlNode node, string name_node)
        {
            XmlNode[] result = null;

            foreach (XmlNode chield_node in node.ChildNodes)
            {
                if (chield_node.Name == name_node)
                {
                    if (result == null) { result = new XmlNode[] { }; }
                    List<XmlNode> list = result.ToList();
                    list.Add(chield_node);
                    result = list.ToArray();
                };
            }
            return result;
        }
        /// <summary>
        /// Применить изменения в XML
        /// </summary>
        /// <param name="xml"></param>
        /// <param name="change_node"></param>
        /// <returns></returns>
        private int SetEditNode(ref string xml, XmlNode change_node)
        {
            XmlDocument doc = new XmlDocument();
            doc.LoadXml(xml);
            XmlNode root = doc.DocumentElement;
            // Определим изменения -----------------------
            // Определим режим
            int mode = -1;
            switch (change_node.Name)
            {
                case "insert": mode = 0; break;
                case "update": mode = 1; break;
                case "delete": mode = 2; break;
            }

            XmlNode edit_node = change_node.FirstChild;
            // Определим узел
            string target = getAttributes<string>(change_node, "target");
            string[] nodes = target.Split('/');
            // Найдем узел
            XmlNode node_searsh = root;
            string name = null;
            int index = 1;

            foreach (string name_node in nodes)
            {
                if (name_node != "OTPR")
                {
                    string[] name_nodes = name_node.Split('[');
                    // Получим чистое имя
                    name = name_nodes[0];
                    // Определим индекс
                    index = 1; // По умолчанию
                    if (name_nodes.Count() > 1)
                    {
                        string[] nums = name_nodes[1].Split(']');
                        index = int.Parse(nums[0]);
                    }

                    if (node_searsh != null)
                    {
                        XmlNode[] searsh_nodes = GetNodes(node_searsh, name);
                        if (searsh_nodes != null && searsh_nodes.Count() >= index)
                        {
                            node_searsh = searsh_nodes[index - 1];
                        }
                        else
                        {
                            // Узла нет! если команда Insert добавить узел
                            if (mode == 0)
                            {
                                XmlElement new_node = doc.CreateElement(name);
                                node_searsh.AppendChild(new_node);
                                node_searsh = new_node;
                            }
                            else
                            {
                                // !!Ошибка нет узла!
                                return -1;
                            }

                        }
                    }
                }
            }

            if (node_searsh == null) return -1; // Ошибка узел не найден!

            if (edit_node == null && mode == 2) // Если не указаны атребуты и операция удаления, удаляем раздел
            {
                XmlNode parent = node_searsh.ParentNode;
                parent.RemoveChild(node_searsh);
            }
            else
            {
                foreach (XmlNode attr in edit_node.Attributes)
                {

                    if (mode == 0 || mode == 1)
                    {
                        XmlNode upd_attr = node_searsh.Attributes.GetNamedItem(attr.Name);
                        if (upd_attr != null)
                        {
                            upd_attr.Value = attr.Value;
                        }
                        else
                        {
                            XmlAttribute new_attr = doc.CreateAttribute(attr.Name);
                            new_attr.Value = attr.Value;
                            node_searsh.Attributes.Append(new_attr);
                        }

                    }
                    if (mode == 2)
                    {
                        node_searsh.Attributes.Remove(node_searsh.Attributes[attr.Name]);
                        //XmlNode at = node_searsh.Attributes.GetNamedItem(attr.Name);
                        //at.RemoveAll();
                    }
                }
                foreach (XmlNode child_node_doc in edit_node.ChildNodes)
                {
                    if (mode == 0)
                    {
                        XmlElement new_node = doc.CreateElement(child_node_doc.Name);
                        foreach (XmlNode attr in child_node_doc.Attributes)
                        {
                            new_node.SetAttribute(attr.Name, attr.Value);
                        }
                        node_searsh.AppendChild(new_node);
                    }
                }
            }
            // обновим
            xml = doc.OuterXml;
            return 1;
        }
        /// <summary>
        /// Обход изменения формирование финальной XML
        /// </summary>
        /// <param name="xRoot"></param>
        /// <param name="xml"></param>
        private void UZ_XML_DOC(XmlElement xRoot, ref string xml)
        {
            foreach (XmlNode xnode in xRoot)
            {
                // если узел - document-data
                if (xnode.Name == "document-data")
                {
                    foreach (XmlNode child_node_doc in xnode.ChildNodes)
                    {
                        // если узел - document-data
                        if (child_node_doc.Name == "uz-rwc-doc")
                        {
                            UZ_XML_DOC((XmlElement)child_node_doc, ref xml);
                        }
                        // если узел - document-data
                        if (child_node_doc.Name == "changes")
                        {
                            // Применить изменения
                            foreach (XmlNode changes_node in child_node_doc.ChildNodes)
                            {
                                int res = SetEditNode(ref xml, changes_node);
                            }
                        }

                        // если узел - document-data
                        if (child_node_doc.Name == "OTPR")
                        {
                            // атрибуты
                            xml = child_node_doc.OuterXml;
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
            }
        }

        /// <summary>
        /// Вернуть XML со всеми изменениями
        /// </summary>
        /// <param name="xml"></param>
        /// <returns></returns>
        public string XMLToFinalXML(string xml)
        {
            try
            {
                string xml_out = null;
                XmlDocument xDoc = new XmlDocument();
                xDoc.LoadXml(xml);
                // получим корневой элемент
                XmlElement xRoot = xDoc.DocumentElement;
                UZ_XML_DOC(xRoot, ref xml_out);
                return xml_out;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetFinalXML(xml)"), this.servece_owner, this.eventID);
                return null;
            }
        }
        
        #endregion



    }
}
