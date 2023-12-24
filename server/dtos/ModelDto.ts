export class ModelDetailsDto {
    public format: string;
    public family: string;
    public families: null;
    public parameter_size: string;
    public quantization_level: string;
}

export class ModelDto {
    public name: string;
    public modified_at: string;
    public size: number;
    public digest: string;
    public details: ModelDetailsDto;
}
