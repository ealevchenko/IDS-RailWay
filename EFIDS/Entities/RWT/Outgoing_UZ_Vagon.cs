namespace EFIDS.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IDS.Outgoing_UZ_Vagon")]
    public partial class Outgoing_UZ_Vagon
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Outgoing_UZ_Vagon()
        {
            Outgoing_UZ_Vagon_Acts = new HashSet<Outgoing_UZ_Vagon_Acts>();
            Outgoing_UZ_Vagon_Cont = new HashSet<Outgoing_UZ_Vagon_Cont>();
            Outgoing_UZ_Vagon_Pay = new HashSet<Outgoing_UZ_Vagon_Pay>();
            OutgoingCars = new HashSet<OutgoingCars>();
        }

        public long id { get; set; }

        public long? id_document { get; set; }

        public int num { get; set; }

        public long id_outgoing { get; set; }

        public long id_car { get; set; }

        public int? id_condition { get; set; }

        public int? id_wagons_rent_arrival { get; set; }

        public int? id_wagons_rent_outgoing { get; set; }

        public int id_countrys { get; set; }

        public int id_genus { get; set; }

        public int id_owner { get; set; }

        public double? gruzp_uz { get; set; }

        public double? tara_uz { get; set; }

        [StringLength(1000)]
        public string note_uz { get; set; }

        public double? gruzp { get; set; }

        public int? u_tara { get; set; }

        public int? ves_tary_arc { get; set; }

        public int? id_warehouse { get; set; }

        public int? id_division { get; set; }

        public bool? laden { get; set; }

        public int? id_cargo { get; set; }

        public int? id_cargo_gng { get; set; }

        public int? vesg { get; set; }

        public int? code_stn_to { get; set; }

        public DateTime create { get; set; }

        [Required]
        [StringLength(50)]
        public string create_user { get; set; }

        public DateTime? change { get; set; }

        [StringLength(50)]
        public string change_user { get; set; }
        public int? kol_conductor { get; set; }

        public virtual Directory_Cargo Directory_Cargo { get; set; }

        public virtual Directory_CargoGNG Directory_CargoGNG { get; set; }

        public virtual Directory_ConditionArrival Directory_ConditionArrival { get; set; }

        public virtual Directory_Countrys Directory_Countrys { get; set; }

        public virtual Directory_Divisions Directory_Divisions { get; set; }

        public virtual Directory_GenusWagons Directory_GenusWagons { get; set; }

        public virtual Directory_OwnersWagons Directory_OwnersWagons { get; set; }

        public virtual Directory_WagonsRent Directory_WagonsRent { get; set; }

        public virtual Directory_WagonsRent Directory_WagonsRent1 { get; set; }

        public virtual Outgoing_UZ_Document Outgoing_UZ_Document { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Outgoing_UZ_Vagon_Acts> Outgoing_UZ_Vagon_Acts { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Outgoing_UZ_Vagon_Cont> Outgoing_UZ_Vagon_Cont { get; set; }

        public virtual OutgoingSostav OutgoingSostav { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Outgoing_UZ_Vagon_Pay> Outgoing_UZ_Vagon_Pay { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<OutgoingCars> OutgoingCars { get; set; }

        public virtual Directory_ExternalStation Directory_ExternalStation { get; set; }
    }
}
