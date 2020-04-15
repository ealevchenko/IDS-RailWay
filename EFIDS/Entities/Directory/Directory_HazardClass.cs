namespace EFIDS.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IDS.Directory_HazardClass")]
    public partial class Directory_HazardClass
    {
        [Key]
        [StringLength(3)]
        public string code { get; set; }

        [Required]
        [StringLength(200)]
        public string hazard_class_ru { get; set; }

        [Required]
        [StringLength(200)]
        public string hazard_class_en { get; set; }

        public DateTime create { get; set; }

        [Required]
        [StringLength(50)]
        public string create_user { get; set; }

        public DateTime? change { get; set; }

        [StringLength(50)]
        public string change_user { get; set; }
    }
}
