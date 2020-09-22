namespace EFIDS.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IDS.Directory_WagonOperations")]
    public partial class Directory_WagonOperations
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Directory_WagonOperations()
        {
            WagonInternalOperation = new HashSet<WagonInternalOperation>();
        }

        public int id { get; set; }

        [Required]
        [StringLength(20)]
        public string operation_name_ru { get; set; }

        [Required]
        [StringLength(20)]
        public string operation_name_en { get; set; }

        public bool busy { get; set; }

        public DateTime create { get; set; }

        [Required]
        [StringLength(50)]
        public string create_user { get; set; }

        public DateTime? change { get; set; }

        [StringLength(50)]
        public string change_user { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<WagonInternalOperation> WagonInternalOperation { get; set; }
    }
}
