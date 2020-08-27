namespace EFIDS.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IDS.Directory_Wagons")]
    public partial class Directory_Wagons
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Directory_Wagons()
        {
            Directory_WagonsRent = new HashSet<Directory_WagonsRent>();
            Arrival_UZ_Vagon = new HashSet<Arrival_UZ_Vagon>();
            //OutgoingCars = new HashSet<OutgoingCars>();
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int num { get; set; }

        public int id_countrys { get; set; }

        public int id_genus { get; set; }

        public int id_owner { get; set; }

        public int? id_operator { get; set; }

        public DateTime? change_operator { get; set; }

        public double gruzp { get; set; }

        public double? tara { get; set; }

        public int kol_os { get; set; }

        [StringLength(10)]
        public string usl_tip { get; set; }

        public DateTime? date_rem_uz { get; set; }

        public DateTime? date_rem_vag { get; set; }

        public int? id_type_ownership { get; set; }

        public int? sign { get; set; }

        [Required]
        [StringLength(1000)]
        public string note { get; set; }

        public int? sobstv_kis { get; set; }

        public bool? bit_warning { get; set; }

        public DateTime create { get; set; }

        [Required]
        [StringLength(50)]
        public string create_user { get; set; }

        public DateTime? change { get; set; }

        [StringLength(50)]
        public string change_user { get; set; }

        public virtual Directory_Countrys Directory_Countrys { get; set; }

        public virtual Directory_GenusWagons Directory_GenusWagons { get; set; }

        public virtual Directory_OperatorsWagons Directory_OperatorsWagons { get; set; }

        public virtual Directory_OwnersWagons Directory_OwnersWagons { get; set; }

        public virtual Directory_TypeOwnerShip Directory_TypeOwnerShip { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Directory_WagonsRent> Directory_WagonsRent { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Arrival_UZ_Vagon> Arrival_UZ_Vagon { get; set; }

        //[System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        //public virtual ICollection<OutgoingCars> OutgoingCars { get; set; }
    }
}
