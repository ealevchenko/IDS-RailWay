namespace EFUZ.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("UZ.Directory_InternalRailroad")]
    public partial class Directory_InternalRailroad
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Directory_InternalRailroad()
        {
            Directory_Stations = new HashSet<Directory_Stations>();
        }

        public int id { get; set; }

        public int id_state { get; set; }

        [Required]
        [StringLength(250)]
        public string internal_railroad { get; set; }

        public int code { get; set; }

        [Required]
        [StringLength(10)]
        public string abbr { get; set; }

        [Required]
        [StringLength(300)]
        public string list_code_station { get; set; }

        public virtual Directory_States Directory_States { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Directory_Stations> Directory_Stations { get; set; }
    }
}
