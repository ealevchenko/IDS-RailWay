namespace EFIDS.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IDS.UZ_DOC")]
    public partial class UZ_DOC
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public UZ_DOC()
        {
            ArrivalCars = new HashSet<ArrivalCars>();
            Arrival_UZ_Document = new HashSet<Arrival_UZ_Document>();
        }

        [Key]
        [StringLength(50)]
        public string num_doc { get; set; }

        public int revision { get; set; }

        public int? status { get; set; }

        public int? num_uz { get; set; }

        [Required]
        [StringLength(4)]
        public string code_from { get; set; }

        [Required]
        [StringLength(4)]
        public string code_on { get; set; }

        public DateTime? dt { get; set; }

        [Column(TypeName = "xml")]
        public string xml_doc { get; set; }

        public DateTime? close { get; set; }

        [StringLength(50)]
        public string close_message { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ArrivalCars> ArrivalCars { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Arrival_UZ_Document> Arrival_UZ_Document { get; set; }
    }
}
