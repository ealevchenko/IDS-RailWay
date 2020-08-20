namespace EFIDS.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IDS.InstructionalLetters")]
    public partial class InstructionalLetters
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public InstructionalLetters()
        {
            InstructionalLettersWagon = new HashSet<InstructionalLettersWagon>();
        }

        public int id { get; set; }

        [Required]
        [StringLength(20)]
        public string num { get; set; }

        public DateTime dt { get; set; }

        [Required]
        [StringLength(200)]
        public string owner { get; set; }

        public int destination_station { get; set; }

        [StringLength(500)]
        public string note { get; set; }

        public DateTime create { get; set; }

        [Required]
        [StringLength(50)]
        public string create_user { get; set; }

        public DateTime? change { get; set; }

        [StringLength(50)]
        public string change_user { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<InstructionalLettersWagon> InstructionalLettersWagon { get; set; }
    }
}
