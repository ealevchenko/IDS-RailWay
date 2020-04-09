namespace EFIDS.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IDS.Directory_ConditionArrival")]
    public partial class Directory_ConditionArrival
    {
        public int id { get; set; }

        [Required]
        [StringLength(100)]
        public string condition_name_ru { get; set; }

        [Required]
        [StringLength(100)]
        public string condition_name_en { get; set; }

        [Required]
        [StringLength(20)]
        public string condition_abbr_ru { get; set; }

        [Required]
        [StringLength(20)]
        public string condition_abbr_en { get; set; }

        public bool? red { get; set; }

        public DateTime create { get; set; }

        [Required]
        [StringLength(50)]
        public string create_user { get; set; }

        public DateTime? change { get; set; }

        [StringLength(50)]
        public string change_user { get; set; }
    }
}
