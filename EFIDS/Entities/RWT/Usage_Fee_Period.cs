namespace EFIDS.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IDS.Usage_Fee_Period")]
    public partial class Usage_Fee_Period
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Usage_Fee_Period()
        {
            Usage_Fee_Period_Detali = new HashSet<Usage_Fee_Period_Detali>();
            Usage_Fee_Period1 = new HashSet<Usage_Fee_Period>();
        }

        public int id { get; set; }

        public int id_operator { get; set; }

        public int id_genus { get; set; }

        public DateTime start { get; set; }

        public DateTime stop { get; set; }

        public int? id_currency { get; set; }

        [Column(TypeName = "money")]
        public decimal? rate { get; set; }

        public int? id_currency_derailment { get; set; }

        [Column(TypeName = "money")]
        public decimal? rate_derailment { get; set; }

        public float? coefficient_route { get; set; }

        public float? coefficient_not_route { get; set; }

        public int? grace_time_1 { get; set; }

        public int? grace_time_2 { get; set; }

        public bool? hour_after_30 { get; set; }

        [StringLength(100)]
        public string note { get; set; }

        public DateTime create { get; set; }

        [Required]
        [StringLength(50)]
        public string create_user { get; set; }

        public DateTime? change { get; set; }

        [StringLength(50)]
        public string change_user { get; set; }

        public DateTime? close { get; set; }

        [StringLength(50)]
        public string close_user { get; set; }

        public int? parent_id { get; set; }
        public virtual Directory_GenusWagons Directory_GenusWagons { get; set; }

        public virtual Directory_OperatorsWagons Directory_OperatorsWagons { get; set; }

        public virtual Directory_Currency Directory_Currency { get; set; }

        public virtual Directory_Currency Directory_Currency1 { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Usage_Fee_Period_Detali> Usage_Fee_Period_Detali { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Usage_Fee_Period> Usage_Fee_Period1 { get; set; }

        public virtual Usage_Fee_Period Usage_Fee_Period2 { get; set; }
    }
}
