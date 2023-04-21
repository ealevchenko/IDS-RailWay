namespace EFIDS.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IDS.WagonUsageFee")]
    public partial class WagonUsageFee
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public WagonUsageFee()
        {
            WagonInternalRoutes = new HashSet<WagonInternalRoutes>();
        }
        public int id { get; set; }

        public long id_wir { get; set; }

        public int num { get; set; }

        public int id_operator { get; set; }

        public int id_genus { get; set; }

        public DateTime date_adoption { get; set; }

        public DateTime date_outgoing { get; set; }

        public bool route { get; set; }

        public bool inp_cargo { get; set; }

        public bool out_cargo { get; set; }

        public bool derailment { get; set; }

        public int count_stage { get; set; }

        public int id_currency { get; set; }

        [Column(TypeName = "money")]
        public decimal rate { get; set; }

        [Column(TypeName = "money")]
        public decimal exchange_rate { get; set; }

        public double coefficient { get; set; }

        public int use_time { get; set; }

        public int grace_time { get; set; }

        public int calc_time { get; set; }

        [Column(TypeName = "money")]
        public decimal calc_fee_amount { get; set; }

        public int? manual_time { get; set; }

        [Column(TypeName = "money")]
        public decimal? manual_fee_amount { get; set; }

        [StringLength(100)]
        public string note { get; set; }

        public DateTime create { get; set; }

        [Required]
        [StringLength(50)]
        public string create_user { get; set; }

        public DateTime? change { get; set; }

        [StringLength(50)]
        public string change_user { get; set; }

        public virtual ICollection<WagonInternalRoutes> WagonInternalRoutes { get; set; }
    }
}
