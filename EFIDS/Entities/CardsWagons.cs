namespace EFIDS.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IDS.CardsWagons")]
    public partial class CardsWagons
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public CardsWagons()
        {
            CardsWagonsRepairs = new HashSet<CardsWagonsRepairs>();
            ParksListWagons = new HashSet<ParksListWagons>();
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int num { get; set; }

        public int id_genus_wagon { get; set; }

        public int id_state { get; set; }

        public int? id_wagon_manufacturer { get; set; }

        public int? year_wagon_create { get; set; }

        public int? code_station { get; set; }

        public float? carrying_capacity { get; set; }

        public float? tara { get; set; }

        public int? id_type_repairs { get; set; }

        public DateTime? date_type_repairs { get; set; }

        [StringLength(20)]
        public string code_model_wagon { get; set; }

        public int? id_type_wagon { get; set; }

        public float? axis_length { get; set; }

        public float? body_volume { get; set; }

        public int id_type_ownership { get; set; }

        public int id_owner_wagon { get; set; }

        public DateTime? date_registration { get; set; }

        public int? id_lessor_wagon { get; set; }

        public int? id_operator_wagon { get; set; }

        public int? id_poligon_travel_wagon { get; set; }

        public int? id_special_conditions { get; set; }

        public int? sap { get; set; }

        [StringLength(500)]
        public string note { get; set; }

        public DateTime create { get; set; }

        [Required]
        [StringLength(50)]
        public string create_user { get; set; }

        public DateTime change { get; set; }

        [Required]
        [StringLength(50)]
        public string change_user { get; set; }

        public virtual Directory_GenusWagons Directory_GenusWagons { get; set; }

        public virtual Directory_LessorsWagons Directory_LessorsWagons { get; set; }

        public virtual Directory_OperatorsWagons Directory_OperatorsWagons { get; set; }

        public virtual Directory_OwnersWagons Directory_OwnersWagons { get; set; }

        public virtual Directory_PoligonTravelWagons Directory_PoligonTravelWagons { get; set; }

        public virtual Directory_SpecialConditions Directory_SpecialConditions { get; set; }

        public virtual Directory_TypeOwnerShip Directory_TypeOwnerShip { get; set; }

        public virtual Directory_TypeWagons Directory_TypeWagons { get; set; }

        public virtual Directory_WagonManufacturers Directory_WagonManufacturers { get; set; }

        public virtual Directory_TypesRepairsWagons Directory_TypesRepairsWagons { get; set; }

        public virtual Directory_ModelsWagons Directory_ModelsWagons { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<CardsWagonsRepairs> CardsWagonsRepairs { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ParksListWagons> ParksListWagons { get; set; }
    }
    //public partial class CardsWagons
    //{
    //    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
    //    public CardsWagons()
    //    {
    //        CardsWagonsRepairs = new HashSet<CardsWagonsRepairs>();
    //    }

    //    [Key]
    //    [DatabaseGenerated(DatabaseGeneratedOption.None)]
    //    public int num { get; set; }

    //    public int id_genus_wagon { get; set; }

    //    public int id_state { get; set; }

    //    public int? id_wagon_manufacturer { get; set; }

    //    public int? year_wagon_create { get; set; }

    //    public int? code_station { get; set; }

    //    public float? carrying_capacity { get; set; }

    //    public float? tara { get; set; }

    //    public int? id_type_repairs { get; set; }

    //    public DateTime? date_type_repairs { get; set; }

    //    [StringLength(20)]
    //    public string code_model_wagon { get; set; }

    //    public int? id_type_wagon { get; set; }

    //    public float? axis_length { get; set; }

    //    public float? body_volume { get; set; }

    //    public int id_type_ownership { get; set; }

    //    public int id_owner_wagon { get; set; }

    //    public DateTime? date_registration { get; set; }

    //    public int? id_lessor_wagon { get; set; }

    //    public int? id_operator_wagon { get; set; }

    //    public int? id_poligon_travel_wagon { get; set; }

    //    public int? id_special_conditions { get; set; }

    //    public int? sap { get; set; }

    //    [StringLength(500)]
    //    public string note { get; set; }

    //    public DateTime create { get; set; }

    //    [Required]
    //    [StringLength(50)]
    //    public string create_user { get; set; }

    //    public DateTime change { get; set; }

    //    [Required]
    //    [StringLength(50)]
    //    public string change_user { get; set; }

    //    public virtual Directory_GenusWagons Directory_GenusWagons { get; set; }

    //    public virtual Directory_LessorsWagons Directory_LessorsWagons { get; set; }

    //    public virtual Directory_OperatorsWagons Directory_OperatorsWagons { get; set; }

    //    public virtual Directory_OwnersWagons Directory_OwnersWagons { get; set; }

    //    public virtual Directory_PoligonTravelWagons Directory_PoligonTravelWagons { get; set; }

    //    public virtual Directory_SpecialConditions Directory_SpecialConditions { get; set; }

    //    public virtual Directory_TypeOwnerShip Directory_TypeOwnerShip { get; set; }

    //    public virtual Directory_TypeWagons Directory_TypeWagons { get; set; }

    //    public virtual Directory_WagonManufacturers Directory_WagonManufacturers { get; set; }

    //    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
    //    public virtual ICollection<CardsWagonsRepairs> CardsWagonsRepairs { get; set; }
    //}
}
