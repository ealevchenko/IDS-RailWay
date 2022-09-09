namespace EFIDS.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IDS.Directory_PayerArrival")]
    public partial class Directory_PayerArrival
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Directory_PayerArrival()
        {
            Arrival_UZ_Document = new HashSet<Arrival_UZ_Document>();
        }

        [Key]
        [StringLength(20)]
        public string code { get; set; }

        [Required]
        [StringLength(100)]
        public string payer_name_ru { get; set; }

        [Required]
        [StringLength(100)]
        public string payer_name_en { get; set; }

        public DateTime create { get; set; }

        [Required]
        [StringLength(50)]
        public string create_user { get; set; }

        public DateTime? change { get; set; }

        [StringLength(50)]
        public string change_user { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Arrival_UZ_Document> Arrival_UZ_Document { get; set; }
    }
}
