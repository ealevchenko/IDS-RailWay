namespace EFIDS.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IDS.Directory_GenusWagons")]
    public partial class Directory_GenusWagons
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Directory_GenusWagons()
        {
            CardsWagons = new HashSet<CardsWagons>();
            Directory_Wagons = new HashSet<Directory_Wagons>();
            Outgoing_UZ_Vagon = new HashSet<Outgoing_UZ_Vagon>();
            Arrival_UZ_Vagon = new HashSet<Arrival_UZ_Vagon>();
            Usage_Fee_Period = new HashSet<Usage_Fee_Period>();
        }

        public int id { get; set; }

        [Required]
        [StringLength(5)]
        public string abbr_ru { get; set; }

        [Required]
        [StringLength(50)]
        public string genus_ru { get; set; }

        [Required]
        [StringLength(5)]
        public string abbr_en { get; set; }

        [Required]
        [StringLength(50)]
        public string genus_en { get; set; }

        public int? rod_uz { get; set; }

        public bool? rod_default { get; set; }

        public DateTime create { get; set; }

        [Required]
        [StringLength(50)]
        public string create_user { get; set; }

        public DateTime? change { get; set; }

        [StringLength(50)]
        public string change_user { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<CardsWagons> CardsWagons { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Directory_Wagons> Directory_Wagons { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Outgoing_UZ_Vagon> Outgoing_UZ_Vagon { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Arrival_UZ_Vagon> Arrival_UZ_Vagon { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Usage_Fee_Period> Usage_Fee_Period { get; set; }
    }
}
