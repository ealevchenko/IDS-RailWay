namespace EFIDS.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("SAP.Out_Supply")]
    public partial class Out_Supply
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Out_Supply()
        {
            SAPOutgoingSupply = new HashSet<SAPOutgoingSupply>();
        }

        public int id { get; set; }

        [Required]
        [StringLength(20)]
        public string TRAID { get; set; }

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

        public DateTime create { get; set; }

        public DateTime? processed { get; set; }

        [StringLength(50)]
        public string processed_user { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<SAPOutgoingSupply> SAPOutgoingSupply { get; set; }
    }
}
