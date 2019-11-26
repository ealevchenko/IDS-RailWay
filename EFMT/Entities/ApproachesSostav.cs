namespace EFMT.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("METRANS.ApproachesSostav")]
    public partial class ApproachesSostav
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public ApproachesSostav()
        {
            ApproachesCars = new HashSet<ApproachesCars>();
            ApproachesSostav1 = new HashSet<ApproachesSostav>();
        }

        public long id { get; set; }

        [Required]
        [StringLength(50)]
        public string file_name { get; set; }

        [Required]
        [StringLength(50)]
        public string composition_index { get; set; }

        public DateTime date_time { get; set; }

        public DateTime create { get; set; }

        public DateTime? close { get; set; }

        public DateTime? approaches { get; set; }

        public long? parent_id { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ApproachesCars> ApproachesCars { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ApproachesSostav> ApproachesSostav1 { get; set; }

        public virtual ApproachesSostav ApproachesSostav2 { get; set; }
    }
}
