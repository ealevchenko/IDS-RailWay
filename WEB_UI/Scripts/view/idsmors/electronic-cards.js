jQuery(document).ready(function ($) {

    // Массив текстовых сообщений 
    $.Text_View =
        {
            'default':  //default language: ru
            {
                'mess_load_ids_dir': 'Загрузка справочников (Справочники ИДС - загружены)...',
                'mess_load_uz_dir': 'Загрузка справочников (Справочники УЗ - загружены)...',
                //'text_type_title_strategic': 'Стратегический',
                //'text_type_title_normative': 'Нормативный',
                //'text_title_project': ' CAPEX',
                //'text_status_open': 'В работе',
                //'text_status_close': 'Завершен',
                //'text_status_pause': 'Остановлен',
                //'text_status_delete': 'Удален',
                //'text_kgrivna': 'тыс. грн.',
                //'text_kdolar': 'тыс. $',
            },
            'en':  //default language: English
            {
                'mess_load_ids_dir': 'Loading directories (IID directories - loaded) ...',
                'mess_load_uz_dir': 'Downloading directories (UZ directories - loaded) ...',
                //'text_type_title_strategic': 'Strategic',
                //'text_type_title_normative': 'Normative',
                //'text_title_project': ' CAPEX',
                //'text_status_open': 'In progress',
                //'text_status_close': 'Completed',
                //'text_status_pause': 'Stopped',
                //'text_status_delete': 'Deleted',
                //'text_kgrivna': 'kUAH',
                //'text_kdolar': 'k$',
            }
        };

    var lang = ($.cookie('lang') === undefined ? 'ru' : $.cookie('lang')),
        langs = $.extend(true, $.extend(true, getLanguages($.Text_View, lang), getLanguages($.Text_Common, lang)), getLanguages($.Text_Table, lang)),
        mors = new IDS_MORS(lang), // Создадим класс IDS_MORS
        loadReference = function (callback) {
            LockScreen(langView('mess_load', langs));
            var count = 1;
            mors.load(['cards_wagons'], function () {
                count -= 1;
                if (count === 0) {
                    if (typeof callback === 'function') {
                        LockScreenOff();
                        callback();
                    }
                }
            });
        };


    // Загрузка библиотек
    loadReference(function (result) {
        //------------------------------------------------
        //Настроим фильтр open/close lateral filter
        $('.cd-filter-trigger').on('click', function () {
            triggerFilter(true);
        });
        $('.cd-filter .cd-close').on('click', function () {
            triggerFilter(false);
        });

        function triggerFilter($bool) {
            var elementsToTrigger = $([$('.cd-filter-trigger'), $('.cd-filter'), $('.cd-tab-filter'), $('.cd-gallery')]);
            elementsToTrigger.each(function () {
                $(this).toggleClass('filter-is-visible', $bool);
            });
        }
        //-------------------------------------------------
        var t = mors
    });

});