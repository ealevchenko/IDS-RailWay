namespace EFIDS.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IDS.Directory_Currency")]
    public partial class Directory_Currency
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Directory_Currency()
        {
            Usage_Fee_Period = new HashSet<Usage_Fee_Period>();
            Usage_Fee_Period1 = new HashSet<Usage_Fee_Period>();
        }

        public int id { get; set; }

        [Required]
        [StringLength(50)]
        public string currency_ru { get; set; }

        [Required]
        [StringLength(50)]
        public string currency_en { get; set; }

        public int code { get; set; }

        [Required]
        [StringLength(3)]
        public string code_cc { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Usage_Fee_Period> Usage_Fee_Period { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Usage_Fee_Period> Usage_Fee_Period1 { get; set; }
    }
}
