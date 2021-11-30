namespace EFIDS.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IDS.SAPOutgoingSupply")]
    public partial class SAPOutgoingSupply
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public SAPOutgoingSupply()
        {
            WagonInternalRoutes = new HashSet<WagonInternalRoutes>();
        }

        public long id { get; set; }

        public int id_out_supply { get; set; }

        public long? id_outgoing_car { get; set; }

        public int num { get; set; }

        [Required]
        [StringLength(10)]
        public string VBELN { get; set; }

        [Column(TypeName = "date")]
        public DateTime ERDAT { get; set; }

        [Required]
        [StringLength(160)]
        public string ZBEZEI { get; set; }

        [Required]
        [StringLength(17)]
        public string STAWN { get; set; }

        [Required]
        [StringLength(150)]
        public string NAME1_AG { get; set; }

        [Required]
        [StringLength(10)]
        public string KUNNR_AG { get; set; }

        [Required]
        [StringLength(30)]
        public string ZRWNAME { get; set; }

        [Required]
        [StringLength(10)]
        public string ZENDSTAT { get; set; }

        [Required]
        [StringLength(30)]
        public string ZCRSTNAME { get; set; }

        [Required]
        [StringLength(10)]
        public string ZCROSSSTAT { get; set; }

        public double ZZVES_NETTO { get; set; }

        [Required]
        [StringLength(4)]
        public string ABTNR { get; set; }

        [Required]
        [StringLength(20)]
        public string VTEXT { get; set; }

        [Required]
        [StringLength(50)]
        public string ZZDOLG { get; set; }

        [Required]
        [StringLength(50)]
        public string ZZFIO { get; set; }

        [Required]
        [StringLength(15)]
        public string ZZPLATEL { get; set; }

        [Required]
        [StringLength(50)]
        public string ZZNAME_PLATEL { get; set; }

        [StringLength(250)]
        public string note { get; set; }

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

        public virtual OutgoingCars OutgoingCars { get; set; }

        public virtual Out_Supply Out_Supply { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<WagonInternalRoutes> WagonInternalRoutes { get; set; }
    }
}
