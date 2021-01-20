namespace EFIDS.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IDS.Directory_DetentionReturn")]
    public partial class Directory_DetentionReturn
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Directory_DetentionReturn()
        {
            OutgoingDetentionReturn = new HashSet<OutgoingDetentionReturn>();
        }

        public int id { get; set; }

        [Required]
        [StringLength(150)]
        public string cause_ru { get; set; }

        [Required]
        [StringLength(150)]
        public string cause_en { get; set; }

        public DateTime create { get; set; }

        [Required]
        [StringLength(50)]
        public string create_user { get; set; }

        public DateTime? change { get; set; }

        [StringLength(50)]
        public string change_user { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<OutgoingDetentionReturn> OutgoingDetentionReturn { get; set; }
    }
}
