namespace EFIDS.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IDS.WagonInternalMoveCargo")]
    public partial class WagonInternalMoveCargo
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public WagonInternalMoveCargo()
        {
            WagonInternalMoveCargo1 = new HashSet<WagonInternalMoveCargo>();
        }

        public long id { get; set; }

        public long id_wagon_internal_routes { get; set; }

        [StringLength(20)]
        public string internal_doc_num { get; set; }

        public int? id_weighing_num { get; set; }

        public DateTime? doc_received { get; set; }

        public int? id_cargo { get; set; }

        public int? id_internal_cargo { get; set; }

        public bool? empty { get; set; }

        public int? vesg { get; set; }

        public int? id_station_from_amkr { get; set; }

        public int? id_division_from { get; set; }

        public long? id_wim_load { get; set; }

        public long? id_wim_redirection { get; set; }

        public int? code_external_station { get; set; }

        public int? id_station_on_amkr { get; set; }

        public int? id_division_on { get; set; }

        public DateTime create { get; set; }

        [Required]
        [StringLength(50)]
        public string create_user { get; set; }

        public DateTime? change { get; set; }

        [StringLength(50)]
        public string change_user { get; set; }

        public DateTime? close { get; set; }

        [StringLength(50)]
        public string close_user { get; set; }

        public long? parent_id { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<WagonInternalMoveCargo> WagonInternalMoveCargo1 { get; set; }

        public virtual WagonInternalMoveCargo WagonInternalMoveCargo2 { get; set; }

        public virtual WagonInternalMovement WagonInternalMovement { get; set; }

        public virtual WagonInternalMovement WagonInternalMovement1 { get; set; }
    }
}
