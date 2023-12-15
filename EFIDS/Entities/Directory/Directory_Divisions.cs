namespace EFIDS.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IDS.Directory_Divisions")]
    public partial class Directory_Divisions
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Directory_Divisions()
        {
            Directory_Divisions1 = new HashSet<Directory_Divisions>();
            Directory_Ways = new HashSet<Directory_Ways>();
            Arrival_UZ_Vagon = new HashSet<Arrival_UZ_Vagon>();
            Outgoing_UZ_Vagon = new HashSet<Outgoing_UZ_Vagon>();
            Directory_Consignee = new HashSet<Directory_Consignee>();
        }

        public int id { get; set; }

        public int position { get; set; }

        [Required]
        [StringLength(250)]
        public string name_division_ru { get; set; }

        [Required]
        [StringLength(250)]
        public string name_division_en { get; set; }

        [Required]
        [StringLength(50)]
        public string division_abbr_ru { get; set; }

        [Required]
        [StringLength(50)]
        public string division_abbr_en { get; set; }

        public int id_type_devision { get; set; }

        [StringLength(5)]
        public string code { get; set; }

        public bool? old { get; set; }

        public int? parent_id { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Directory_Consignee> Directory_Consignee { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Directory_Divisions> Directory_Divisions1 { get; set; }

        public virtual Directory_Divisions Directory_Divisions2 { get; set; }

        public virtual Directory_TypeDivision Directory_TypeDivision { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Directory_Ways> Directory_Ways { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Arrival_UZ_Vagon> Arrival_UZ_Vagon { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Outgoing_UZ_Vagon> Outgoing_UZ_Vagon { get; set; }
    }
}
