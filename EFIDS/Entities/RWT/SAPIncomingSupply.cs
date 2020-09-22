namespace EFIDS.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IDS.SAPIncomingSupply")]
    public partial class SAPIncomingSupply
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public SAPIncomingSupply()
        {
            WagonInternalRoutes = new HashSet<WagonInternalRoutes>();
        }

        
        public long id { get; set; }

        public long id_arrival_car { get; set; }

        public int num { get; set; }

        [Required]
        [StringLength(35)]
        public string num_doc_uz { get; set; }

        public DateTime? date_doc_uz { get; set; }

        [StringLength(6)]
        public string code_border_checkpoint { get; set; }

        [StringLength(35)]
        public string name_border_checkpoint { get; set; }

        public DateTime? cross_time { get; set; }

        [StringLength(10)]
        public string VBELN { get; set; }

        [StringLength(3)]
        public string NUM_VBELN { get; set; }

        [StringLength(4)]
        public string WERKS { get; set; }

        [StringLength(4)]
        public string LGORT { get; set; }

        [StringLength(16)]
        public string LGOBE { get; set; }

        [Column(TypeName = "date")]
        public DateTime? ERDAT { get; set; }

        public TimeSpan? ETIME { get; set; }

        [StringLength(4)]
        public string LGORT_10 { get; set; }

        [StringLength(16)]
        public string LGOBE_10 { get; set; }

        [StringLength(18)]
        public string MATNR { get; set; }

        [StringLength(40)]
        public string MAKTX { get; set; }

        [StringLength(35)]
        public string NAME_SH { get; set; }

        [StringLength(4)]
        public string KOD_R_10 { get; set; }

        [StringLength(250)]
        public string note { get; set; }

        public DateTime? term { get; set; }

        public int? attempt { get; set; }

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

        public virtual ArrivalCars ArrivalCars { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<WagonInternalRoutes> WagonInternalRoutes { get; set; }
    }
}
