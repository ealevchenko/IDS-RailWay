jQuery(document).ready(function ($) {

    //--------------------------------------------------------------------------------
    // Панель "Править название парка"
    var pn_edit_park_name = {
        obj: null,
        lang : ($.cookie('lang') === undefined ? 'ru' : $.cookie('lang')),
        mors : new IDS_MORS(this.lang), // Создадим класс IDS_MORS
        init: function () {
            //mors.load(['cards_wagons', 'cards_wagons_repairs'], function () { });
            pn_edit_park_name.obj = $("div#edit-park-name").dialog({
                resizable: false,
                modal: true,
                autoOpen: false,
                height: "auto",
                width: 500,
                buttons: [
                  {
                      text: "Сохранить",
                      class: "btn btn-warning btn-lg",
                      click: function () {
                          $(this).dialog("close");
                      }
                  },
                  {
                      text: "Отмена",
                      class: "btn btn-warning btn-lg",
                      click: function () {
                          $(this).dialog("close");
                      }
                  },
                ]
            });
        },
        Open: function (id) {
            pn_edit_park_name.obj.dialog("open");
            if (id) {
                pn_edit_park_name.obj.dialog("option", "title", 'Добавить парк подвижного состава');
            } else {
                pn_edit_park_name.obj.dialog("option", "title", 'Изменить название парка подвижного состава');
            }
            //if (id) {
            //    // пистолеты
            //    if (trk_num > 0 && trk_num < 10) {
            //        confirm_rfid_card.obj.dialog("option", "title", 'RFID-карта (Колонка №' + trk_num + ', сторона :' + (side == 0 ? 'левая' : 'правая') + ')');
            //    }
            //    // Наливной стояк
            //    if (trk_num >= 10 && trk_num <= 12) {
            //        var num = trk_num - 9;
            //        confirm_rfid_card.obj.dialog("option", "title", 'RFID-карта (Наливной стояк №' + num + ')');
            //    }

            //    var card = cards.getCardOfNumSide(trk_num, side);
            //    if (card) {
            //        $('#id').val(card.Id);
            //        $('#Number').val(card.Number);
            //        $('#DriverName').val(card.DriverName);
            //        $('#AutoNumber').val(card.AutoNumber);
            //        $('#Debitor').val(card.Debitor);
            //        $('#Sn1').val(card.Sn1);
            //        $('#Sn2').val(card.Sn2);
            //        $('#AutoModel').val(card.AutoModel);
            //        $('#Street').val(card.Street);
            //        $('#House').val(card.Name);
            //        $('#CreateDate').val(card.CreateDate);
            //        $('#CreateTime').val(card.CreateTime);
            //        $('#UpdateDate').val(card.UpdateDate);
            //        $('#UpdateTime').val(card.UpdateTime);
            //        $('#Owner').val(card.Owner);
            //        $('#Active').prop('checked', card.Active);
            //    }
            //}
        }
    };

    pn_edit_park_name.init();

    $('button#add-park').on('click', function () {
        pn_edit_park_name.Open();
    });
});

