namespace EFIDS.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IDS.Directory_Cars")]
    public partial class Directory_Cars
    {
        public int id { get; set; }

        public int num { get; set; }

        public int id_countrys { get; set; }

        public int id_genus { get; set; }

        public int id_owner { get; set; }

        public bool? ban_changes_owner { get; set; }

        public int? id_operator { get; set; }

        public double gruzp { get; set; }

        public int kol_os { get; set; }

        [StringLength(10)]
        public string usl_tip { get; set; }

        public DateTime? date_rem_uz { get; set; }

        public DateTime? date_rem_vag { get; set; }

        public int? id_limiting { get; set; }

        public int? id_type_ownership { get; set; }

        public DateTime? rent_start { get; set; }

        public DateTime? rent_end { get; set; }

        [Required]
        [StringLength(200)]
        public string note { get; set; }

        public int? sobstv_kis { get; set; }

        public DateTime create { get; set; }

        [Required]
        [StringLength(50)]
        public string create_user { get; set; }

        public DateTime? change { get; set; }

        [StringLength(50)]
        public string change_user { get; set; }

        public virtual Directory_Countrys Directory_Countrys { get; set; }

        public virtual Directory_GenusWagons Directory_GenusWagons { get; set; }

        public virtual Directory_LimitingLoading Directory_LimitingLoading { get; set; }

        public virtual Directory_OperatorsWagons Directory_OperatorsWagons { get; set; }

        public virtual Directory_OwnersWagons Directory_OwnersWagons { get; set; }

        public virtual Directory_TypeOwnerShip Directory_TypeOwnerShip { get; set; }
    }
}
