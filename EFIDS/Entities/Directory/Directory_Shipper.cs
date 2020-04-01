namespace EFIDS.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IDS.Directory_Shipper")]
    public partial class Directory_Shipper
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int code { get; set; }

        [Required]
        [StringLength(100)]
        public string shipper_name_ru { get; set; }

        [Required]
        [StringLength(100)]
        public string shipper_name_en { get; set; }

        public DateTime create { get; set; }

        [Required]
        [StringLength(50)]
        public string create_user { get; set; }

        public DateTime? change { get; set; }

        [StringLength(50)]
        public string change_user { get; set; }
    }
}
