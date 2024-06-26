namespace EFIDS.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IDS.UZ_DOC_OUT")]
    public partial class UZ_DOC_OUT
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public UZ_DOC_OUT()
        {
            OutgoingCars = new HashSet<OutgoingCars>();
        }

        [Key]
        [StringLength(50)]
        public string num_doc { get; set; }

        public int revision { get; set; }

        public int? status { get; set; }

        [Required]
        [StringLength(4)]
        public string code_from { get; set; }

        [Required]
        [StringLength(4)]
        public string code_on { get; set; }

        public DateTime? dt { get; set; }

        [Column(TypeName = "xml")]
        public string xml_doc { get; set; }

        public int? num_uz { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<OutgoingCars> OutgoingCars { get; set; }
    }
}
