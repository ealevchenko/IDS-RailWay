namespace EFIDS.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IDS.Directory_OperatorsWagons")]
    public partial class Directory_OperatorsWagons
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Directory_OperatorsWagons()
        {
            CardsWagons = new HashSet<CardsWagons>();
            Directory_Wagons = new HashSet<Directory_Wagons>();
            Directory_WagonsRent = new HashSet<Directory_WagonsRent>();
            Usage_Fee_Period = new HashSet<Usage_Fee_Period>();
            Directory_OperatorsWagons1 = new HashSet<Directory_OperatorsWagons>();
        }

        public int id { get; set; }

        [Required]
        [StringLength(20)]
        public string abbr_ru { get; set; }

        [Required]
        [StringLength(100)]
        public string operators_ru { get; set; }

        [Required]
        [StringLength(20)]
        public string abbr_en { get; set; }

        [Required]
        [StringLength(100)]
        public string operators_en { get; set; }

        public bool paid { get; set; }

        public bool rop { get; set; }

        public bool local_use { get; set; }

        [StringLength(10)]
        public string color { get; set; }

        public bool? monitoring_idle_time { get; set; }
        public int? parent_id { get; set; }

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
        public virtual ICollection<Directory_WagonsRent> Directory_WagonsRent { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Usage_Fee_Period> Usage_Fee_Period { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Directory_OperatorsWagons> Directory_OperatorsWagons1 { get; set; }
        public virtual Directory_OperatorsWagons Directory_OperatorsWagons2 { get; set; }
    }
}
