namespace EFIDS.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IDS.Directory_BorderCheckpoint")]
    public partial class Directory_BorderCheckpoint
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int code { get; set; }

        [Required]
        [StringLength(50)]
        public string station_name_ru { get; set; }

        [Required]
        [StringLength(50)]
        public string station_name_en { get; set; }

        public int code_railway { get; set; }

        [Required]
        [StringLength(50)]
        public string railway_name_ru { get; set; }

        [Required]
        [StringLength(50)]
        public string railway_name_en { get; set; }

        [Required]
        [StringLength(10)]
        public string railway_abbr_ru { get; set; }

        [Required]
        [StringLength(10)]
        public string railway_abbr_en { get; set; }

        public int code_state { get; set; }

        public DateTime create { get; set; }

        [Required]
        [StringLength(50)]
        public string create_user { get; set; }

        public DateTime? change { get; set; }

        [StringLength(50)]
        public string change_user { get; set; }
    }
}
