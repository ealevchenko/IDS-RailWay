namespace EFIDS.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IDS.WagonFiling")]
    public partial class WagonFiling
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public WagonFiling()
        {
            WagonInternalMovement = new HashSet<WagonInternalMovement>();
        }

        public long id { get; set; }

        [Required]
        [StringLength(50)]
        public string num_filing { get; set; }

        public int type_filing { get; set; }

        public int id_division { get; set; }

        public int? vesg { get; set; }

        [StringLength(250)]
        public string note { get; set; }

        public DateTime? start_filing { get; set; }

        public DateTime? end_filing { get; set; }

        public DateTime? doc_received { get; set; }

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

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<WagonInternalMovement> WagonInternalMovement { get; set; }
    }
}
