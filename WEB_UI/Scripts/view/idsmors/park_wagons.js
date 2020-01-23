jQuery(document).ready(function ($) {

    //--------------------------------------------------------------------------------
    // Панель "Информация по RFID-карте"
    var confirm_rfid_card = {
        obj: null,
        init: function () {
            confirm_rfid_card.obj = $("#confirm-rfid-card").dialog({
                resizable: false,
                modal: true,
                autoOpen: false,
                height: "auto",
                width: 400,
                buttons: {
                    'Закрыть': function () {
                        $(this).dialog("close");
                    }
                }
            });
        },
        Open: function (trk_num, side) {
            if (trk_num && side) {
                // пистолеты
                if (trk_num > 0 && trk_num < 10) {
                    confirm_rfid_card.obj.dialog("option", "title", 'RFID-карта (Колонка №' + trk_num + ', сторона :' + (side == 0 ? 'левая' : 'правая') + ')');
                }
                // Наливной стояк
                if (trk_num >= 10 && trk_num <= 12) {
                    var num = trk_num - 9;
                    confirm_rfid_card.obj.dialog("option", "title", 'RFID-карта (Наливной стояк №' + num + ')');
                }
                confirm_rfid_card.obj.dialog("open");
                var card = cards.getCardOfNumSide(trk_num, side);
                if (card) {
                    $('#id').val(card.Id);
                    $('#Number').val(card.Number);
                    $('#DriverName').val(card.DriverName);
                    $('#AutoNumber').val(card.AutoNumber);
                    $('#Debitor').val(card.Debitor);
                    $('#Sn1').val(card.Sn1);
                    $('#Sn2').val(card.Sn2);
                    $('#AutoModel').val(card.AutoModel);
                    $('#Street').val(card.Street);
                    $('#House').val(card.Name);
                    $('#CreateDate').val(card.CreateDate);
                    $('#CreateTime').val(card.CreateTime);
                    $('#UpdateDate').val(card.UpdateDate);
                    $('#UpdateTime').val(card.UpdateTime);
                    $('#Owner').val(card.Owner);
                    $('#Active').prop('checked', card.Active);
                }
            }
        }
    };
    confirm_rfid_card.init()
});

