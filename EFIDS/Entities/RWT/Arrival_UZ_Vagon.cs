namespace EFIDS.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IDS.Arrival_UZ_Vagon")]
    public partial class Arrival_UZ_Vagon
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Arrival_UZ_Vagon()
        {
            Arrival_UZ_Vagon_Acts = new HashSet<Arrival_UZ_Vagon_Acts>();
            Arrival_UZ_Vagon_Cont = new HashSet<Arrival_UZ_Vagon_Cont>();
            Arrival_UZ_Vagon_Pay = new HashSet<Arrival_UZ_Vagon_Pay>();
        }

        public long id { get; set; }

        public long id_document { get; set; }

        public int num { get; set; }

        public long id_arrival { get; set; }

        public int id_car { get; set; }

        public int? id_condition { get; set; }

        public int? id_type { get; set; }

        public double? gruzp { get; set; }

        public int? u_tara { get; set; }

        public int? ves_tary_arc { get; set; }

        public bool? route { get; set; }

        [StringLength(200)]
        public string note_vagon { get; set; }

        public int? id_cargo { get; set; }

        public int? id_cargo_gng { get; set; }

        public int? id_certification_data { get; set; }

        public int? id_commercial_condition { get; set; }

        public int? kol_pac { get; set; }

        [StringLength(3)]
        public string pac { get; set; }

        public int? vesg { get; set; }

        public double? vesg_reweighing { get; set; }

        [StringLength(20)]
        public string nom_zpu { get; set; }

        [StringLength(3)]
        public string danger { get; set; }

        [StringLength(4)]
        public string danger_kod { get; set; }

        public bool? cargo_returns { get; set; }

        public int? id_station_on_amkr { get; set; }

        public int? id_division_on_amkr { get; set; }

        public bool? empty_car { get; set; }

        public int? kol_conductor { get; set; }

        public DateTime create { get; set; }

        [Required]
        [StringLength(50)]
        public string create_user { get; set; }

        public DateTime? change { get; set; }

        [StringLength(50)]
        public string change_user { get; set; }
        public int? id_owner { get; set; }
        public int? id_countrys { get; set; }
        public int? id_genus { get; set; }
        public int? kol_os { get; set; }
        [StringLength(10)]
        public string usl_tip { get; set; }
        public DateTime? date_rem_uz { get; set; }
        public DateTime? date_rem_vag { get; set; }
        public int? id_type_ownership { get; set; }
        public double? gruzp_uz { get; set; }
        public double? tara_uz { get; set; }
        public virtual Arrival_UZ_Document Arrival_UZ_Document { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Arrival_UZ_Vagon_Acts> Arrival_UZ_Vagon_Acts { get; set; }

        public virtual ArrivalSostav ArrivalSostav { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Arrival_UZ_Vagon_Cont> Arrival_UZ_Vagon_Cont { get; set; }

        public virtual Directory_Cargo Directory_Cargo { get; set; }

        public virtual Directory_CargoGNG Directory_CargoGNG { get; set; }

        public virtual Directory_CertificationData Directory_CertificationData { get; set; }

        public virtual Directory_CommercialCondition Directory_CommercialCondition { get; set; }

        public virtual Directory_ConditionArrival Directory_ConditionArrival { get; set; }

        public virtual Directory_HazardClass Directory_HazardClass { get; set; }

        public virtual Directory_Station Directory_Station { get; set; }

        public virtual Directory_Divisions Directory_Divisions { get; set; }

        public virtual Directory_TypeWagons Directory_TypeWagons { get; set; }

        public virtual Directory_Wagons Directory_Wagons { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Arrival_UZ_Vagon_Pay> Arrival_UZ_Vagon_Pay { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ArrivalCars> ArrivalCars { get; set; }
    }
}
