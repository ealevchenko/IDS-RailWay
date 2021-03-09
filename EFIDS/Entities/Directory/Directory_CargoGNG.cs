namespace EFIDS.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IDS.Directory_CargoGNG")]
    public partial class Directory_CargoGNG
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Directory_CargoGNG()
        {
            Arrival_UZ_Vagon = new HashSet<Arrival_UZ_Vagon>();
            Arrival_UZ_Vagon_Cont = new HashSet<Arrival_UZ_Vagon_Cont>();
            Outgoing_UZ_Vagon_Cont = new HashSet<Outgoing_UZ_Vagon_Cont>();
            Outgoing_UZ_Vagon = new HashSet<Outgoing_UZ_Vagon>();
        }

        public int id { get; set; }

        public int code { get; set; }

        [Required]
        [StringLength(250)]
        public string cargo_gng_name_ru { get; set; }

        [Required]
        [StringLength(250)]
        public string cargo_gng_name_en { get; set; }

        public DateTime create { get; set; }

        [Required]
        [StringLength(50)]
        public string create_user { get; set; }

        public DateTime? change { get; set; }

        [StringLength(50)]
        public string change_user { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Arrival_UZ_Vagon> Arrival_UZ_Vagon { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Arrival_UZ_Vagon_Cont> Arrival_UZ_Vagon_Cont { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Outgoing_UZ_Vagon_Cont> Outgoing_UZ_Vagon_Cont { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Outgoing_UZ_Vagon> Outgoing_UZ_Vagon { get; set; }
    }
}
